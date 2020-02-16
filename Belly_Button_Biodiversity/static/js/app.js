
// function DrawBubbleChart(selectedSampleID)
// {
//     console.log("DrawBubbleChart: sample =  ", selectedSampleID);

//     d3.json("samples.json").then((data) => {

//         var samples = data.samples;
//         var resultArray = samples.filter(sampleObj => sampleObj.id == selectedSampleID);
//         var result = resultArray[0];

//         var otu_ids = result.otu_ids;
//         var otu_labels = result.otu_labels;
//         var sample_values = result.sample_values;



//         var bubbleTrace = {
//             x: otu_ids,
//             y: sample_values,
//             text: otu_labels,
//             mode: 'markers',
//             marker: {
//                 color: otu_ids, 
//                 opacity: .5,
//                 size: sample_values
//             }
//         };
    
//         var bubbleData = [bubbleTrace];

//         var bubbleLayout = {
//             title: 'All Bacteria Samples, by ID',
//             xaxis: {
//                 title: 'OTU ID'
//             },
//             yaxis: {
//                 title: 'Bacteria Count'
//             },
//             showlegend: false,
//             height: 600,
//             width: 1200
//         };

//         Plotly.newPlot('bubble', bubbleData, bubbleLayout);
//     });
// }




// **************************************************************************
// *****   Define function to Show the Metadata for the selected Sample ID
// **************************************************************************

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


// ****************************************************************************
// *******        Define Function to fetch data, assign variables,       ******
// *******   and draw Bar + Bubble Charts illustrating bacteria counts   ******
// ****************************************************************************

function DrawBarBubble(selectedSampleID)
{
    console.log("DrawBargraph: sample = ", selectedSampleID);

    d3.json("samples.json").then((data) => {

        // ******************************************************************
        // Fetch data variables for the Sample ID that that the user selected

        var samples = data.samples;
        var resultArray = samples.filter(sampleObj => sampleObj.id == selectedSampleID);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;


        // *****************************************************************
        // *** Draw Bar Chart showing Top 10 bacteria counts for this Sample ID

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
    
        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        };

        Plotly.newPlot("bar", barData, barLayout);


        // *****************************************************************
        // *** Draw Bubble Chart showing bacteria counts for this Sample ID

        var bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids, 
                opacity: .5,
                size: sample_values
            }
        };
    
        var bubbleData = [bubbleTrace];

        var bubbleLayout = {
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

        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

    });
}




function DrawGaugeChart(selectedSampleID)
{
    console.log("DrawGaugeChart: sample =  ", selectedSampleID);

    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == selectedSampleID);
        result = resultArray[0];
        var washfreq = result.wfreq;

        var data = [
            {
                domain: {x: [0, 1], y: [0, 1] },
                value: washfreq,
                gauge: {axis: {range: [0, 10]}, bar: {color: "darkblue"}},
                title: { text: "Belly Button Washing Frequency<br><sub>Scrubs Per Week</sub>" },
                subtitle: {text: "Scrubs Per Week"},
                type: 'indicator',
                mode: 'gauge+number'
            }
        ];

        var layout = { 
            width: 400, 
            height: 300, 
            margin: { l: 5, r: 5},
         };

        Plotly.newPlot('gauge', data, layout);
    });
}


// *************************************************************************
// ****    Create 'optionChanged' function                       ***********
// ****     - This function is called from the event listener    ***********
// ****       attached to the dropdown selector in index.html    ***********
// ****   - 'newSampleID' is the ID that the user has selected   ***********
// *************************************************************************

function optionChanged(newSampleID)
{
    console.log("Dropdown changed to: ", newSampleID);

    ShowMetadata(newSampleID);
    DrawBarBubble(newSampleID);
    DrawGaugeChart(newSampleID);
}




// **********************************************************************
// ******  Initialize screen with default Charts + information      *****
// ******   and populate dropdown selector with list of Sample IDs  *****
// ********************************************************************** 

function Init() {
    console.log("Initializing Screen");

    sampleID = 940;
  
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

    DrawBarBubble(sampleID);
    ShowMetadata(sampleID);
    DrawGaugeChart(sampleID);
}

Init();

