//initialising myMoment to be set for time and date now
let myMoment = moment();
//initialising an empty object for data storage 
let StorageObj = {}
//run the main function
manipulate()

//navigate dates backward
$(".fa-arrow-circle-right").click(() => {
    myMoment = myMoment.add(1, 'day')
    manipulate()
})
//navigate dates forward
$(".fa-arrow-circle-left").click(() => {
    myMoment = myMoment.subtract(1, 'day')
    manipulate()
})
function display_date() {
    if (window.innerWidth > 580) {
        $("#currentDay").text(myMoment.format('dddd , Do [of] MMMM, YYYY	'))
    }
    else {
        //Display shorter date format on smaller screens
        $("#currentDay").text(myMoment.format('ddd, DD/MM/YYYY'))
    }
}
window.onresize = display_date //for responsive experience the function runs when the window is resized
//main function
function manipulate() {
    //Display selected Date on screen 
    display_date();
    // Set timeNow to be 24hour format integer value of the current hour
    const timeNow = parseInt(moment().format('HH'))
    //read data in localStorage and put it in the Storage object created @ initialisation
    if (localStorage.getItem(myMoment.format('DD/MM/YY')) !== null) {
        StorageObj = {
            [myMoment.format('DD/MM/YY')]: JSON.parse(localStorage.getItem(myMoment.format('DD/MM/YY')))
        }
    } else {
        StorageObj = {
            [myMoment.format('DD/MM/YY')]: {}
        }
    }

    $(".container").empty() //empty the container before the new build

    for (i = 9; i < 18; i++) { //Loop to generate rows and blocks for every hour from 9:00 am to 5:00 pm
        //Set time of Block every time the loop is executed
        let timeOfBlock = parseInt(myMoment.startOf('day').add(i, 'hour').format('HH').slice(0, 2))
        //Access DoM using JQuery to create elements and set attributes
        let newRow = $("<div class='row'></div")
        let newHour = $("<div class='col-2 col-lg-1  hour '></div>")
        let newDesc = $("<div class='col-8 col-lg-10 '></div>")
        let newTextArea = $('<textarea class="description">')
        let newSave = $("<div class='col-2 col-lg-1 saveBtn saveData'><i class=' saveData far fa-save'></i></div>")
        newTextArea.attr("id", "text" + timeOfBlock)
        newSave.attr("id", timeOfBlock)
        newDesc.append(newTextArea)
        newRow.append(newHour)
        newRow.append(newDesc)
        newRow.append(newSave)
        //Add created content to the empty container
        $(".container").append(newRow)
        //check Storage Object for this specifix date and time, if it has data add it to the text of the corresponding hour
        if (!jQuery.isEmptyObject(StorageObj[myMoment.format('DD/MM/YY')]) && StorageObj[myMoment.format('DD/MM/YY')][timeOfBlock] !== undefined) {
            $("#text" + timeOfBlock).val(StorageObj[myMoment.format('DD/MM/YY')][timeOfBlock])
        }
        //Add hour text with HH:mm AM/PM format
        newHour.text((myMoment.startOf('day').add(i, 'hour').format('LT')))
        //compare current data and hour to all blocks and add calsses to get them coloured accordingly
        //if they are in past or present or future
        if (myMoment.startOf('Day').valueOf() === moment().startOf('Day').valueOf()) {
            if (timeOfBlock > timeNow) {
                newDesc.addClass("future")
            }
            else if (timeOfBlock === timeNow) {
                newDesc.addClass("present")
            } else {
                newDesc.addClass("past")
            }
        } else if (myMoment.startOf('Day').valueOf() > moment().startOf('Day').valueOf()) {
            newDesc.addClass("future")
        } else {
            newDesc.addClass("past")
        }
    }

}
// Save to local Storage on Click
$(document).on('click', '.saveBtn', function () {
    StorageObj[myMoment.format('DD/MM/YY')][this.id] = $("#text" + this.id).val()
    localStorage.setItem([myMoment.format('DD/MM/YY')], JSON.stringify(StorageObj[myMoment.format('DD/MM/YY')]))
})
// Save to local Storage on hitting 'Enter' key
$(document).on('keyup', '.description', function (e) {
    if (e.key === "Enter") {
        StorageObj[myMoment.format('DD/MM/YY')][this.id.slice(4)] = $("#" + this.id).val()
        localStorage.setItem([myMoment.format('DD/MM/YY')], JSON.stringify(StorageObj[myMoment.format('DD/MM/YY')]))
    }
})