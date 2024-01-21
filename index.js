import Express from "express";
import 'dotenv/config';
import fs from 'fs';
// Middleware configuration
import bodyParser from 'body-parser';

// Creating a new express instance
const app = Express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;

// Parsing the data from string to object
let stories = JSON.parse(fs.readFileSync('data.json','utf-8'));

// Route to `get` all stories posted by users
app.get('/' , (req,res)=> {
    if (stories)
        res.status(200).json(stories); // On successful response from server
    else
        res.status(400).json({message:"No stories found"}) // If error in server
})
// Route to `get` story based on the ID
app.get('/story/:id', (req,res)=> {
    console.log(req.params.id);
    const story_id = req.params.id; // getting ID from URI
    // Finding the story based on the story_id
    const story = stories.find((story) => story.id === parseInt(story_id));
    if (story) {
        res.status(200).json(story);
    } else {
        res.status(404).json({ message: "No story with id " + story_id});
    }
})

// Route to `create` a new story
app.post('/create_story', (req, res) => {
    console.log(req.body);
    const story = req.body;
    if(story){
        if(story.title){
            if(story.body){
                story.id = Math.floor(Math.random()*1000 + story.title.length);
                stories.push(story);
                fs.writeFileSync('data.json', JSON.stringify(stories), 'utf8');
                res.status(201).json({story});
            }else{
                res.status(500).json({message: 'Body of the story not found'});
            }
        }else{
            res.status(500).json({message: 'Title not found'});
        }
    }else {
        res.status(500).json({message: 'Error while creating story'});
    }
})

// Route to `update or create` the story
app.put('/update_story/:id', (req, res) => {
    const story_id = parseInt(req.params.id)
    console.log(req.body);
    const data = req.body;
    const index = stories.findIndex((story) => story.id === story_id) || -1;
    if(index === -1) {
        res.status(404).json({ error:`Story with ID ${story_id} Not Found`})
    } else{
        stories[index] = {...stories[index], ...data}
        fs.writeFileSync('data.json', JSON.stringify(stories), 'utf8')
        res.status(200).json({"success": "Story Updated Successfully"})
    }
})

// Route to `update` the story
app.patch('/update_story/:id', (req, res) => {
    const story_id = parseInt(req.params.id)
    console.log(req.body);
    const data = req.body;
    const index = stories.findIndex((story) => story.id === story_id) || -1;
    if(index === -1) {
        res.status(404).json({ error:`Story with ID ${story_id} Not Found`})
    } else{
        stories[index] = {...stories[index], ...data}

        fs.writeFileSync('data.json', JSON.stringify(stories), 'utf8')
        res.status(200).json({"success": "Story Updated Successfully"})
    }
})



// Listening to the PORT on which server is running
app.listen(port, ()=>{
    console.log("listening on port " + port);
})