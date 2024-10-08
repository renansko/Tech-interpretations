import client from "@/lib/appwrite_client"
import { Databases, ID, Query } from "appwrite"
import { NextResponse } from "next/server";

const database = new Databases(client);


//Create interpretation
async function createInterpratetion(data: {term: string, interpretation: string}) {
    try{
        const response = await database
        .createDocument(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "Interpretations",
            ID.unique(),
            data
            );

            return response
    }catch(error){
        console.error('Error creating interpretation', error);
        throw new Error('Failed to create interpretation');
    }  
}

//Fetch interpretation
async function fetchInterpratetion() {
    try{
        const response = await database
        .listDocuments(
            process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string,
            "Interpretations",
            [Query.orderDesc("$createdAt")]
            );

            return response.documents;
    }catch(error){
        console.error('Error fetch interpretation', error);
        throw new Error('Failed to fetch interpretation');
    }  
}

export async function POST(req: Request){
    try{
        const {term, interpretation} = await req.json();
        const data = {term, interpretation};
        const response = await createInterpratetion(data);
        return NextResponse.json({message: "Interpretation created", obj: response})
    } catch (error) {
       return NextResponse.json(
        {
            error: 'Failed to create interpretation',
            error_message: error
        },
        {
            status: 500
        })
    }
}

export async function GET() {
    try {
        const interpretation = await fetchInterpratetion();
        return NextResponse.json(interpretation);
    }catch(error){
        return NextResponse.json(
            {
            error: "Failed to fetch interpretations",
            error_message: error
            },
            {status: 500}
        )
    }
}