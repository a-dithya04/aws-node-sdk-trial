
import { createInterface } from "readline/promises";

import {
    S3Client,
    PutObjectCommand,
    CreateBucketCommand,
    DeleteObjectCommand,
    DeleteBucketCommand,
    paginateListObjectsV2,
    GetObjectCommand,
} from "@aws-sdk/client-s3";

export async function main() {

    const s3Client = new S3Client({
        region: "ap-southeast-1", credentials: {
            accessKeyId: "AKIA3FLD5BGUYKSJMLO6",
            secretAccessKey: "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"
        }
    });



    const bucketName = `test-bucket-${Date.now()}`;
    await s3Client.send(
        new CreateBucketCommand({
            Bucket: bucketName,
        })
    );

    // Put an object into an Amazon S3 bucket.
    await s3Client.send(
        new PutObjectCommand({
            Bucket: bucketName,
            Key: "my-first-object.txt",
            Body: "Hello JavaScript SDK!",
        })
    );

    // Read the object.
    const { Body } = await s3Client.send(
        new GetObjectCommand({
            Bucket: bucketName,
            Key: "my-first-object.txt",
        })
    );

    console.log(await Body.transformToString());

    // Confirm resource deletion.
    const prompt = createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    const result = await prompt.question("Empty and delete bucket? (y/n) ");
    prompt.close();

    if (result === "y") {
        // Create an async iterator over lists of objects in a bucket.
        const paginator = paginateListObjectsV2(
            { client: s3Client },
            { Bucket: bucketName }
        );
        for await (const page of paginator) {
            const objects = page.Contents;
            if (objects) {
                // For every object in each page, delete it.
                for (const object of objects) {
                    await s3Client.send(
                        new DeleteObjectCommand({ Bucket: bucketName, Key: object.Key })
                    );
                }
            }
        }

        // Once all the objects are gone, the bucket can be deleted.
        //In AWS S3, only empty buckets can be deleted.
        await s3Client.send(new DeleteBucketCommand({ Bucket: bucketName }));
    }
}


main();

