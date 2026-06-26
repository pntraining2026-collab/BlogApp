const express = require('express');
const router = express.Router();
const Post = require('../models/post');
/**
 * GET/
 * HOME
 */
router.get('', async (req, res) => {
    try {
        const locals = {
            title: "NodeJs Blog",
            description: "Simple blog created with Nodejs,Express & MongoDB."
        }
        let perPage = 10;
        let page = req.query.page || 1;
        const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
            .skip(perPage * page - perPage)
            .limit(perPage)
            .exec();
        const count = await Post.countDocuments();
        const nextPage = parseInt(page) + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        return res.render('index', {
            locals,
            data,
            current: page,
            nextPage: hasNextPage ? nextPage : null,
            currentRoute:`/post`
        });
    } catch (error) {
        console.log(error);
    }
});
/**
 * GET/
 * HOME
 */
router.get('/post/:id', async (req, res) => {
    try {
        let slug = req.params.id;
        const data = await Post.findById({ _id: slug });
        const locals = {
            title: data.title,
            description: "Simple blog created with Nodejs,Express & MongoDB."
        }
        return res.render('post', { locals, data ,currentRoute:`/post/${slug}`});
    } catch (error) {
        console.log(error);
    }
    res.render('index', { locals });
});
/**
 * POST/
 * Post -searchTerm
 */
router.post('/search', async (req, res) => {
    try {
        const locals = {
            title: "Search",
            description: "Simple blog created with Nodejs,Express & MongoDB."
        }
        let searchTerm=req.body.searchTerm;
        const searchNoSpecialChar=searchTerm.replace(/[^a-zA-Z0-9]/g,"")
        const data = await Post.find({
            $or:[
            {title:{$regex:new RegExp(searchNoSpecialChar,'i')}},
            {body:{$regex:new RegExp(searchNoSpecialChar,'i')}}
            ]
    });
        return res.render("search",{
            data,
            locals
        });
    } catch (error) {
        console.log(error);
    }
});
router.get('/about', (req, res) => {
    res.render('about',{
        currentRoute:'/about'
    });
});
// function insertPostData(){
//     Post.insertMany([
//         {
//             title:"Building first app",
//             body:"Learning is fun"
//         },
//         {
//             title: "Exploring JavaScript",
//             body: "Functions are building blocks"
//         },
//         {
//             title: "Mastering CSS",
//             body: "Design makes a difference"
//         },
//         {
//             title: "Understanding Databases",
//             body: "Data is the new oil"
//         },
//         {
//             title: "React Basics",
//             body: "Components make everything reusable"
//         },
//         {
//             title: "Diving into Node.js",
//             body: "Server-side coding simplified"
//         },
//         {
//             title: "Building API with Express",
//             body: "Routes lead the way"
//         },
//         {
//             title: "Styling with Tailwind",
//             body: "Utility-first CSS rocks"
//         },
//         {
//             title: "Learning Git",
//             body: "Version control is essential"
//         },
//         {
//             title: "Debugging Techniques",
//             body: "Bugs teach the best lessons"
//         },
//         {
//             title: "Intro to Cloud",
//             body: "Deploy anywhere, anytime"
//         },
//         {
//             title: "Creating Portfolio",
//             body: "Showcase your skills"
//         },
//         {
//             title: "Power of SQL",
//             body: "Queries unlock information"
//         },
//     ])
// }
// insertPostData();
module.exports = router;