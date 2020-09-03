let myMoment = moment();
let StorageObj = {}
manipulate()


$(".fa-arrow-circle-right").click(() => {
    myMoment = myMoment.add(1, 'day')
    manipulate()
})
$(".fa-arrow-circle-left").click(() => {
    myMoment = myMoment.subtract(1, 'day')
    manipulate()
})

function manipulate() {

    $("#currentDay").text(myMoment.format('dddd , Do [of] MMMM, YYYY	'))
    const timeNow = parseInt(moment().format('HH'))

    if (localStorage.getItem(myMoment.format('DD/MM/YY')) !== null) {
        StorageObj = {
            [myMoment.format('DD/MM/YY')]: JSON.parse(localStorage.getItem(myMoment.format('DD/MM/YY')))
        }
    } else {
        StorageObj = {
            [myMoment.format('DD/MM/YY')]: {}
        }
    }
    $(".container").empty()
    for (i = 9; i < 18; i++) {
        let timeOfBlock = parseInt(myMoment.startOf('day').add(i, 'hour').format('HH').slice(0, 2))
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
        $(".container").append(newRow)
        if (!jQuery.isEmptyObject(StorageObj[myMoment.format('DD/MM/YY')]) && StorageObj[myMoment.format('DD/MM/YY')][timeOfBlock] !== undefined) {
            $("#text" + timeOfBlock).val(StorageObj[myMoment.format('DD/MM/YY')][timeOfBlock])
        }
        newHour.text((myMoment.startOf('day').add(i, 'hour').format('LT')))
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
    //Save the typed info by clicking "Save Button" 
    $(".saveBtn").click(function () {
        StorageObj[myMoment.format('DD/MM/YY')][this.id] = $("#text" + this.id).val()
        localStorage.setItem([myMoment.format('DD/MM/YY')], JSON.stringify(StorageObj[myMoment.format('DD/MM/YY')]))
    })
    //Save the typed info by clicking "Enter"  
    $(".description").on('keyup', function (e) {
        if (e.key === "Enter") {
            StorageObj[myMoment.format('DD/MM/YY')][this.id.slice(4)] = $("#" + this.id).val()
            localStorage.setItem([myMoment.format('DD/MM/YY')], JSON.stringify(StorageObj[myMoment.format('DD/MM/YY')]))
        }
    })
}


// document.addEventListener('click', function (e) {
//   if (e.target.className.includes('saveBtn')) {
//     console.log("you clicked me")
//     StorageObj[myMoment.format('DD/MM/YY')][e.target.id] = $("#text" + e.target.id).val()
//     localStorage.setItem([myMoment.format('DD/MM/YY')], JSON.stringify(StorageObj[myMoment.format('DD/MM/YY')]))
//   } else if (e.target.parentElement.className.includes('saveBtn')) {
//     console.log("you clicked me")
//     StorageObj[myMoment.format('DD/MM/YY')][e.target.parentElement.id] = $("#text" + e.target.parentElement.id).val()
//     localStorage.setItem([myMoment.format('DD/MM/YY')], JSON.stringify(StorageObj[myMoment.format('DD/MM/YY')]))
//   }
// })