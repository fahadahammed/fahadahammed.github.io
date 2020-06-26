let menulinks = [
    "#about", "#resume", "#photos", "#contact",
];

function hidesection(sectionname) {
    console.log("Hiding section: ", sectionname)
    $(sectionname).hide(500);
}

function showsection(sectionname) {
    _.forEach(menulinks, function(value) {
        hidesection(value);
      });
    console.log("Showing section: ", sectionname)
    $(sectionname).show(1000);
}


$('.mymenu').click(function (e) {
    let thelink = e.target.hash;
    showsection(thelink);
});


// Shorthand for $( document ).ready()
$(function () {
    console.log("ready!");
    hidesection("#resume");
    hidesection("#photos");
    hidesection("#contact");
    let wl = window.location;
    let thehash = wl.hash;
    if (thehash === "") {
        thehash = "#about";
    }
    showsection(thehash);
});



$("#rsm-experiences").click(function () {
    let fp = $(`#${this.id}`.replace("rsm-", ""));
    fp.attr("tabindex", -1).focus();
});

$("#rsm-skills").click(function () {
    let fp = $(`#${this.id}`.replace("rsm-", ""));
    fp.attr("tabindex", -1).focus();
});

$("#rsm-vision").click(function () {
    let fp = $(`#${this.id}`.replace("rsm-", ""));
    fp.attr("tabindex", -1).focus();
});

$("#rsm-prjcts").click(function () {
    let fp = $(`#${this.id}`.replace("rsm-", ""));
    fp.attr("tabindex", -1).focus();
});

$("#rsm-langprof").click(function () {
    let fp = $(`#${this.id}`.replace("rsm-", ""));
    fp.attr("tabindex", -1).focus();
});

$("#rsm-devprac").click(function () {
    let fp = $(`#${this.id}`.replace("rsm-", ""));
    fp.attr("tabindex", -1).focus();
});

$("#rsm-newtools").click(function () {
    let fp = $(`#${this.id}`.replace("rsm-", ""));
    fp.attr("tabindex", -1).focus();
});

$("#rsm-conadd").click(function () {
    let fp = $(`#${this.id}`.replace("rsm-", ""));
    fp.attr("tabindex", -1).focus();
});