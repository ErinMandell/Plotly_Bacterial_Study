
// function DrawBargraph(sampleID)
// {
//     console.log("DrawBargraph: sample = ", sampleID);
// }


// function DrawBubbleChart(sampleID)
// {
//     console.log("DrawBublleChart: sampleID ; ", sampleID);
// }

// function ShowMetadata(sampleID)
// {
//     console.log("ShowMetadata: sampleID = ", sampleID);
// }

// function optionChanged(newSampleID)
// {
//     ShowMetadata(newSampleID);
//     DrawBargraph(newSampleID);
//     DrawBubbleChart(newSampleID);
//     console.log("Draop Down changed to ", newSampleID);
// }



// // ** Initialize the screen with default information **
// // populate the dropdown with the list of ID's from the dataset

// function init()
// {
//     console.log("initializing screen");
//     var selector = d3.select("#selDataset");

//     d3.json("samples.json"), then((data) => {
//         var sampleName = data.names;

//         sampleNames.forEach((sample) => {
//             selector
//                 .append("option")
//                 .text(sample)
//                 .property("value", sample);
//         })
//     })

//     sampleID = 100

//     DrawBargraph(sampleID);
//     DrawBubbleChart(sampleID);
//     ShowMetadata(sampleID);
// }

// init();