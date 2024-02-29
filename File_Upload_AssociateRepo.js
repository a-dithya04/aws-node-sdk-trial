
import { createInterface } from "readline/promises";

import {
    createReadStream,
} from "fs";

import {
    S3Client,
    PutObjectCommand,
    CreateBucketCommand,

} from "@aws-sdk/client-s3";

import {
    CodeGuruReviewer,

} from "@aws-sdk/client-codeguru-reviewer"

export async function main() {

    const s3 = new S3Client({
        region: "ap-southeast-1",
        credentials: {
            accessKeyId: "ACCESS_KEY_ID",
            secretAccessKey: "SECRET_ACCESS_KEY"
        }
    });



    const bucketName = `codeguru-reviewer-1`;
    await s3.send(
        new CreateBucketCommand({
            Bucket: bucketName,
        })
    );

    // Specify parameters for the upload
    const uploadParams = {
        Bucket: bucketName,
        Key: 'review_this_file.py', // e.g., filename.txt'
        Body: createReadStream('./sample_hash.py') 
    };

    // Upload file to S3
    await s3.send(
        new PutObjectCommand(uploadParams, (err, data) => {
            if (err) {
                console.error("Error", err);
            } else {
                console.log("Upload successful", data.Location);
            }
        })
    );


    const params = {
        'Repository': {
            's3Bucket': {
                'bucketName': "codeguru-reviewer-1",
                'Name': "folder-repo"
            }
        }
    };

    const codeguru = new CodeGuruReviewer({
        region: "ap-southeast-1",
        credentials: {
            accessKeyId: "ACCESS_KEY_ID",
            secretAccessKey: "SECRET_ACCESS_KEY"
        }

    });
    codeguru.associateRepository(params, (err, data) => {
        if (err) {
            console.error('Error associating repository:', err);
        } else {
            console.log('Repository associated successfully:', data);
        }
    });


}

main();