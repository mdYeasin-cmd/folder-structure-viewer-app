const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT | 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.0nieed1.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        const foldersCollection = client.db('folderStructureViewerDB').collection('folders');

        app.patch('/folders', async (req, res) => {
            // Extracting values from req.bodt
            let { folder, pathName } = req.body;

            /**
             * Checking for the folder is exist or not
             */
            const sentLabel = folder.label;
            // Targeted paths
            const allPaths = pathName.split('%%');
            let queryKey = '';
            allPaths.forEach((path) => {
                queryKey = queryKey + 'children.';
            });
            queryKey += 'label';
            const query = {};
            query.label = allPaths[0];
            query[queryKey] = sentLabel;
            const result = await foldersCollection.findOne(query);
            if (result) {
                return res.send({ status: 'Failed' });
            }

            /**
             * Update part start
             */
            // Setting New folder pathName
            folder.pathName = pathName + '%%' + folder.label;

            // Making the queries
            let updateQueryKey = '';
            let filteringOptions = [];
            allPaths.forEach((path, index) => {
                if (index !== allPaths.length - 1) {
                    updateQueryKey += `children.$[a${index}].`;
                    let option = {};
                    option[`a${index}.label`] = allPaths[index + 1];
                    filteringOptions = [...filteringOptions, option];
                }
            });
            updateQueryKey += 'children';

            let updateQuery = {};
            updateQuery[updateQueryKey] = folder;
            // Update Operation
            const updateResult = await foldersCollection.updateOne(
                { label: allPaths[0] },
                {
                    $push: updateQuery,
                },
                { arrayFilters: filteringOptions }
            );
            res.send({
                status: 'Success',
                data: updateResult,
                query: query,
                folder: folder,
            });
        });

        // app.put('/folders', async (req, res) => {
        //     const newFolderDir = req.body;
        //     const { id } = newFolderDir;
        //     console.log(uuidv4());
        //     newFolderDir.id = uuidv4();

        //     const query = {};
        //     const folders = await foldersCollection.find(query).toArray();
        //     const underId = folders[0].children;
        //     console.log(underId);
        //     const newArr = [...underId, newFolderDir];

        //     const filter = {
        //         id: id
        //     }

        //     const updateDoc = {
        //         $set: {
        //             children: newArr
        //         }
        //     }

        //     const result = await foldersCollection.updateOne(filter, updateDoc);
        //     res.send(result);
        // });



        app.get('/folders', async (req, res) => {
            const query = {};
            const result = await foldersCollection.find(query).toArray();
            res.send(result);
        });

        app.delete('/folders/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await foldersCollection.deleteOne(query);
            res.send(result);
        })

    }
    finally {

    }
}

run().catch(error => console.log(error));

app.get('/', (req, res) => {
    res.send('Folder structure viewer server is running');
});

app.listen(port, () => {
    console.log(`Folder structure viewer server is running on port ${port}`);
});