
function DrawBargraph(selectedSampleID)
{
    console.log("DrawBargraph: sample = ", selectedSampleID);

    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        console.log("All Samples: ", samples);

        // filter all of the sample ID objects to find the one that matches the selected Sample ID
        
        var resultArray = samples.filter(sampleObj => sampleObj.id == selectedSampleID);
        console.log("resultArray for selectedSampleID: ", resultArray);

        var result = resultArray[0];
        console.log(result);

        var otu_ids = result.otu_ids;
        console.log("otu_ids: ", otu_ids);

        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var yticks = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();

        var barData = [
            {
                x: sample_values.slice(0, 10).reverse(),
                y:  yticks,
                type: "bar",
                text: otu_labels.slice(0, 10).reverse(),
                orientation: "h"
            }
        ];
    
        var varLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        };

        Plotly.newPlot("bar", barData, varLayout);
    });
}


function DrawBubbleChart(sampleID)
{
    console.log("DrawBubbleChart: sample =  ", sampleID);
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

    sampleID = 940;
  
    var selector = d3.select("#selDataset");

    d3.json("samples.json").then((data) => {
        var sampleNames = data.names;
        // console.log("Init SampleNames: ", sampleNames);

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

