import {
    CodeGuruReviewerClient,
    ListRecommendationsCommand
} from "@aws-sdk/client-codeguru-reviewer"

const config = {
    region: "REGION",
    credentials: {
        accessKeyId: "ACCESS_KEY_ID",
        secretAccessKey: "SECRET_ACCESS_KEY"
    }
};

const client = new CodeGuruReviewerClient(config);

const input = { // ListRecommendationsRequest
    // NextToken: "A", //Docs say it is a pagination token but not sure about allowed values and usage
    MaxResults: Number("100"), //No of results per call/page
    CodeReviewArn: "PROVIDED BY CREATE CODE REVIEW REQUEST", // required
};
const command = new ListRecommendationsCommand(input);


const response = await client.send(command);