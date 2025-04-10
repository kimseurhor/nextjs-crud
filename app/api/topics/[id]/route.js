import { NextResponse } from "next/server";
import Topic from "@/models/topic";
import connectMongoDB from "@/libs/mongodb";

export async function PUT(request, { params }) {
    const {id} = await params;
    const {newTitle : title , newDescription:description} = await request.json();
    await connectMongoDB();
    await Topic.findByIdAndUpdate(id, {title, description});
    return NextResponse.json({message:"Topic Updated"},{status: 200})
}

export async function GET(request, {params}){
    const {id} = await params;
    await connectMongoDB();
    const topic = await Topic.findOne({_id: id})
    return NextResponse.json({topic},{status: 200})
}