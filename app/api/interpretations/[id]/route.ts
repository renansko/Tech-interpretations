import client from "@/lib/appwrite_client"
import { Databases} from "appwrite"
import { NextResponse } from "next/server";

const database = new Databases(client);


// Fetch a specific interpretation

async function fetchInterpretation(id: string) {
    try{
        const interpretation = await database.getDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "Interpretations",
            id
        );
        return interpretation


    }catch(error){
        console.error( "Error fetching interpretation", error);
        throw new Error("Failed to fetch interpretation");
    }   
}

async function deleteInterpretation(id: string){
    try {
        const response = await database.deleteDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "Interpretations",
            id
        );
        return response
    }catch (error){
        console.error( "Error deliting interpretation", error);
        throw new Error("Failed to deliting interpretation");
    }
}

async function updateInterpretation(id: string, data: {term: string, interpretation: string}){
    try {
        const response = await database.updateDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "Interpretations",
            id,
            data
        );
        return response
    }catch (error){
        console.error( "Error updated interpretation", error);
        throw new Error("Failed to updated interpretation");
    }
}

export async function GET(req: Request, {params}: {params: {id: string}}) {
    try {
        const id = params.id;
        const interpretation = await fetchInterpretation(id);

        return NextResponse.json({interpretation})

    } catch (error) {
        console.error( "Error get interpretation", error);
        return NextResponse.json({error: "Failed to fetch interpretation"}, {status: 500}) 
    }
}

export async function DELETE(req: Request, {params}: {params: {id: string}}) {
    try {
        const id = params.id;
        await deleteInterpretation(id);

        return NextResponse.json({message: "Interpretation deleted"})

    } catch (error) {
        console.error( "Error get interpretation", error);
        return NextResponse.json({error: "Failed to fetch interpretation"}, {status: 500}) 
    }
}

export async function PUT(req: Request, {params}: {params: {id: string}}) {
    try {
        const id = params.id;
        const interpretation = await req.json();
        console.log(interpretation)
        await updateInterpretation(id, interpretation);
        return NextResponse.json({message: "Interpretation updated"})

    } catch (error) {
        console.error( "Error updated interpretation", error);
        return NextResponse.json({error: "Failed to updated interpretation"}, {status: 500}) 
    }
}