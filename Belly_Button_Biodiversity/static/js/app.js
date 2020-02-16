
function DrawBubbleChart(selectedSampleID)
{
    console.log("DrawBubbleChart: sample =  ", selectedSampleID);

    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        // console.log("All Samples: ", samples);

        var resultArray = samples.filter(sampleObj => sampleObj.id == selectedSampleID);
        // console.log("resultArray for selectedSampleID: ", resultArray);

        var result = resultArray[0];
        // console.log(result);

        var otu_ids = result.otu_ids;
        // console.log("otu_ids: ", otu_ids);

        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;



        var trace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            // text: sample_values,
            mode: 'markers',
            marker: {
                color: otu_ids, 
                opacity: .5,
                size: sample_values
            }
        };
    
        var data = [trace];

        var layout = {
            title: 'All Bacteria Samples, by ID',
            xaxis: {
                title: 'OTU ID'
            },
            yaxis: {
                title: 'Bacteria Count'
            },
            showlegend: false,
            height: 600,
            width: 1200
        };

        Plotly.newPlot('bubble', data, layout);
    });
}


function DrawGaugeChart(sampleID)
{
    console.log("DrawBubbleChart: sample =  ", sampleID);


}


function ShowMetadata(selectedSampleID)
{
    console.log("ShowMetadata: sample = ", selectedSampleID);
    
    d3.json("samples.json").then((data) => {

        d3.select("#sample-metadata").selectAll("tr").remove();

        var metadata = data.metadata;
        // console.log("All Metadata: ", metadata);

        var resultArray = metadata.filter(sampleObj => sampleObj.id == selectedSampleID);
        console.log("Metadata result for selected ID: ", resultArray);
        result = resultArray[0];

        var id = result.id;
        var ethnicity = result.ethnicity;
        console.log(ethnicity);
        var gender = result.gender;
        var age = result.age;
        var location = result.location;
        var bbtype = result.bbtype;
        var washfreq = result.wfreq;

        var tbody = d3.select("#sample-metadata");
        var trow;
        trow = tbody.append("tr");
        trow.append("tr").text(`Subject ID:  ${id}`);
        trow.append("tr").text(`Ethnicity:  ${ethnicity}`);
        trow.append("tr").text(`Gender:  ${gender}`);
        trow.append("tr").text(`Age:  ${age}`);
        trow.append("tr").text(`Location:  ${location}`);
        trow.append("tr").text(`Belly Button Type:  ${bbtype}`);
        trow.append("tr").text(`Wash Frequency:  ${washfreq}`);
    });
}


function DrawBargraph(selectedSampleID)
{
    console.log("DrawBargraph: sample = ", selectedSampleID);

    d3.json("samples.json").then((data) => {

        var samples = data.samples;
        // console.log("All Samples: ", samples);

        // filter all of the sample ID objects to find the one that matches the selected Sample ID
        
        var resultArray = samples.filter(sampleObj => sampleObj.id == selectedSampleID);
        // console.log("resultArray for selectedSampleID: ", resultArray);

        var result = resultArray[0];
        // console.log(result);

        var otu_ids = result.otu_ids;
        // console.log("otu_ids: ", otu_ids);

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
    DrawGaugeChart(sampleID);
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
    DrawGaugeChart(sampleID);
}

Init();

