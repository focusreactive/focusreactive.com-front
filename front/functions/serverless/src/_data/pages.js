const fetch = require("node-fetch");

module.exports = async (params) => {
    const dynamicSlug = params.eleventy?.serverless?.query?.slug;

    let QUERY = encodeURIComponent(`*[_type == "pages" && !(_id in path("drafts.**"))]`);
    if (dynamicSlug) {
        QUERY = encodeURIComponent(
            `coalesce(*[_type == "pages" && slug.current == "${dynamicSlug}" && _id in path("drafts.**")][0],*[_type == "pages" && slug.current == "${dynamicSlug}"][0])`
        );
    }

    let PROJECT_ID = "nzudkmke";
    let DATASET = "production";

    // Compose the URL for your project's endpoint and add the query
    let URL = `https://${PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${DATASET}?query=${QUERY}`;

    const data = await fetch(URL, {
        headers: {
            Authorization:
                "Bearer skB5uHVZpMcGpjN6wKVQOZ6cWU3inNSTX3wgphH2mhavcKuPAsJXsOlxUl0YXtDfLwCKJok8y35luq4pOwFfuEj5xAMV2C6N21zJru2fPR6shBudoMRKyLyOVusmvDWnEPjLGu1Y2F6mJaBMesvXlVbTwpsrITgvxxJaE67oiBCJFDQ1xlZN",
        },
    })
        .then((res) => res.json())
        .catch((err) => console.error(err));

    console.log("RESULT", data);

    return data.result.length ? data.result : [data.result];
};
