
function DrawBargraph(sampleID)
{
    console.log("DrawBargraph: sample = ", sampleID);
}


function DrawBubbleChart(sampleID)
{
    console.log("DrawBublleChart: sample =  ", sampleID);
}


function ShowMetadata(sampleID)
{
    console.log("ShowMetadata: sample = ", sampleID);
}


// create 'optionChanged' function which is referenced in the index line 27.
// This will be the ID that the user has selected

function optionChanged(newSampleID)
{
    // buildCharts(newSample);
    // buldMetadata(newSample);

    console.log("Dropdown changed to: ", newSampleID);

    ShowMetadata(newSampleID);
    DrawBargraph(newSampleID);
    DrawBubbleChart(newSampleID);
}



// ** Initialize the screen with default information **
// populate the dropdown with the list of ID's from the dataset
// Do this by 

function Init() {
    console.log("Initializing Screen");

    sampleID = 100;
  
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;

        sampleNames.forEach((sampleID) => {
            selector
                .append("option")
                .text(sampleID)
                .property("value", sampleID);
        });
    });

    DrawBargraph(sampleID);
    DrawBubbleChart(sampleID);
    ShowMetadata(sampleID);
}

Init();

