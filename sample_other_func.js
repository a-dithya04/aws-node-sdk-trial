import {
    CodeGuruReviewerClient,
    DescribeRepositoryAssociationCommand,
    DescribeCodeReviewCommand,
    DisassociateRepositoryCommand,
    ListCodeReviewsCommand,
    ListRepositoryAssociationsCommand
} from "@aws-sdk/client-codeguru-reviewer"

const config = {
    region: "REGION",
    credentials: {
        accessKeyId: "ACCESS_KEY_ID",
        secretAccessKey: "SECRET_ACCESS_KEY"
    }
};

const client = new CodeGuruReviewerClient(config);

const input = { // ListRepositoryAssociationsRequest
    ProviderTypes: [ // ProviderTypes
        "S3Bucket",
    ],
    MaxResults: Number("100"),

};
const command = new ListRepositoryAssociationsCommand(input)


const input = { // DescribeRepositoryAssociationRequest
    AssociationArn: "PROVIDED BY ASSOCIATE REPOSITORY COMMAND", // required
};
const command = new DescribeRepositoryAssociationCommand(input);


const input = { // ListCodeReviewsRequest

    Type: "RepositoryAnalysis", // required
    MaxResults: Number("100"),
};
const command = new ListCodeReviewsCommand(input);



const input = { // DescribeCodeReviewRequest
    CodeReviewArn: 'PROVIDED BY CREATE CODE REVIEW REQUEST' //required
};
const command = new DescribeCodeReviewCommand(input);




const input = { //DissociateRepositoryRequest
    AssociationArn: "PROVIDED BY CREATE CODE REVIEW REQUEST", // required
};
const command = new DisassociateRepositoryCommand(input);



const response = await client.send(command);
console.log(response);

