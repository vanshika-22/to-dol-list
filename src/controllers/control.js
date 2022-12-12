const { request, response } = require("express");
const {Todo} = require("../models/models");

// api to display work
const getwork = async (request,response) => {
    var workId = request.query.workId;
    if (workId){
        try{
            var allwork = await Todo.findById({workId});
        }
        catch{

            allwork = null;
        }
    }
    else{
        var allwork = await Todo.find();
    }
    return response.json(allwork);
};

//api to add work in todo list
const creatework = async (request,response) => {
    await Todo.create(request.body);
    return response.json("New work has been posted to TODO list");
};

//api to update the deails of the work

const toupdatework = async (request,response) => {
    var workId = request.query.id;
    await Todo.findByIdAndUpdate(workId,request.body);
    return response.json("Details Updated");
};

const todeletework = async (request,response) => {
    var workId = request.query.id;
    try{
        var work = await Todo.findById(workId);
        if(!work){
            return response
            .status(404)
            .json({status: "Error",msg: "Id doesn't exist"});            
        }
    }
    catch{
        return response
        .status(404)
        .json({status: "Error",msg: "Id doesn't exist"});
    }
    await Todo.findByIdAndDelete(workId,request.body);
    return response.json("Details Deleted");
}

const toupdatestatus = async (request,response) => {
    var getdata = { iscompleted: false };
    var setdata = {$set: {iscompleted: true} };
    await Todo.updateMany(getdata,setdata)
    return response.json("Details Updated");
}

module.exports = {getwork,creatework,toupdatework,todeletework,toupdatestatus};