pbid = "#progressBar"
MAX_TWEET_SIZE = 240
MAX_ITERATION = 20
tweetText = [
    "Dear @USCIS @USCISDirector @RepZoeLofgren NSC published processing time for 765s 1-11 Month. Not true! 100k applications submitted in Oct 2020 which are just Received status- Process these applications or present facts #NebraskaUSCISDelays",
    "Dear @USCIS @USCISDirector @RepZoeLofgren The lack of accountability for an agency funded by immigrants is baffling. Ready to waste 80K+ GC when they have 288K to adjudicate and 1M in backlog. ",
    "Dear @USCIS @USCISMediaCntrl @RepZoeLofgren @USCISDirector  Anyting to comment? Unbelievable! What is going on with #NebraskaServiceCenter? Why arent they approving fully qualified EB GCs?"
]

function setProgressBar(pi, val) {

    min = $(pbid).attr("aria-valuemin");
    max = $(pbid).attr("aria-valuemax");
    valper = (val + 1) / (max - min) * 100;


    $(pi).css('width', valper + '%').attr('aria-valuenow', val)
}
var twitter_url = "https://twitter.com/intent/tweet?";
var inreplyto = "";
var textSuffix = "text=";
var prefix = "@USCIS "
var hashtags = " #MakeNebraskaCenterWork #TransferCasestoNBC";
var days_to_fiscal_year = get_remaining_business_days();

var tweet_ids = ['1529848649915674624', '1529493517894131712', '1527646479690637313', '1529587645487144966']

var text_section_1 = [
    'Dear @USCISDirector',
    '@USCISDirector',
    'Are you listening @USCISDirector?',
    'Stop hurting us @USCISDirector.',
    '@USCISDirector, listen to us!',
    'Why @USCISDirector. Why?',
    'This is not fair @USCISDirector.',
    '.@USCISDirector, your inaction is unacceptable!'
]

text_section_1 = text_section_1.filter(onlyUnique)

var text_section_2 = [
    '@USCIS must provide relief NOW!',
    'Process cases or #TransferToNBC now!',
    'The lack of accountability for an agency funded by immigrants is baffling.',
    '@USCISDirector @USCIS are you not tired of repeating  the same lies. I693 pending @ Nebraska since Sept/Oct 2021!',
    'Treat us with dignity!',
    '#USCISAnswers When will Nebraska process pending RFERs since Sept/Oct 2021!!',
    'Do not punish immigrants! Relief now!',
    'Unbelievable! #USCISAnswers What is going on with #NebraskaServiceCenter? Why arent they approving fully qualified EB GCs?',
    'Your lack of action impacts THOUSANDS of families.',
    'Do not throw immigrants under the bus.',
    '@USCISDirector NSC Nebraska is big driver for this wastage, help!',
    "Don't lie and make immigrants die!",
    'Take some action and provide relief now!',
    'Many RFE response havebeen pending for  225+ days at Nebraska! Is anything under your control @USCISDirector',
    'There are only ' + days_to_fiscal_year + ' days left in this fiscal year before we go back to 10s of years of backlog',
    'NSC published processing time for 765s 1-11 Month. Not true!',
    'Only ' + days_to_fiscal_year + ' days left in this fiscal year! ',
    'Wastage of 100,000 green cards is the ruin of 100,000 lives of legal immigrants who followed the rules.',
    days_to_fiscal_year + " days remaining before 10000's of familes goes back to decade long backlog."
]

text_section_2 = text_section_2.filter(onlyUnique)

var tags = ['#TransferCasesToNBC',
    '#MakeNebraskaCenterWork',
    '#MakeNSCwork', "#USCISAnswers"]

tags = tags.filter(onlyUnique)

var mentions = ['@USCIS',
    '@USCISDirector']

mentions = mentions.filter(onlyUnique)


var generateNextTweet = function () {
    total_size_remaining = MAX_TWEET_SIZE

    _first_text = getRandomitem(text_section_1, total_size_remaining)
    total_size_remaining -= _first_text.length

    _second_text = (total_size_remaining > 5) ? getRandomitem(text_section_2, total_size_remaining) : ""
    total_size_remaining -= _second_text.length


    _third_text = (total_size_remaining > 5) ? getRandomitemunique(text_section_2, total_size_remaining, _second_text) : ""
    total_size_remaining -= _third_text.length


    _hash_tag1 = (total_size_remaining > 5) ? getRandomitem(tags, total_size_remaining) : ""
    total_size_remaining -= _hash_tag1.length

    _hash_tag2 = (total_size_remaining > 5) ? getRandomitemunique(tags, total_size_remaining, _hash_tag1) : ""
    total_size_remaining -= _hash_tag2.length

    inreplyto = get_in_reply_to()


    tt_without_mention = _first_text + " " + _second_text + " " + _third_text;
    tt = try_append_mention(tt_without_mention, [_hash_tag1, _hash_tag2].concat(mentions))



    twitterHref = twitter_url + inreplyto + textSuffix + encodeURIComponent(tt);

    $("#tweetInReplyTo").attr("href", twitterHref);
    $("#tweetToUscis").attr("href", twitterHref);
    $('#textarMessage').html(tt);

}

function get_in_reply_to() {
    if (Math.floor(Math.random() * 8) == 4) {
        return "in_reply_to=" + getRandomitem(tweet_ids, 999) + "&"
    }
    return ""

}



function getRandomitem(list_text, max_size) {
    if (max_size <= 0) {
        return ""
    }
    list_text = shuffle(list_text)
    sz = list_text.length;
    keep_doing = 0
    do {
        rnd = Math.floor(Math.random() * tweetText.length);
        item = list_text[rnd]
        if (item.length < max_size) {
            return item
        }
        keep_doing++
    } while (keep_doing < MAX_ITERATION)
    return ""
}

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function getRandomitemunique(list_text, max_size, comparewith) {
    i = 0
    item = ""
    do {
        item = getRandomitem(list_text, max_size);
        if (++i > MAX_ITERATION) {
            return "";
        }
    } while (item.length > max_size || item == comparewith)
    return item
}

function try_append_mention(t_text, ar_items) {
    updated_text = t_text
    for (let index = 0; index < ar_items.length; ++index) {

        element = ar_items[index];
        if (element == "@USCIS") {
            element = "@USCIS "
        }
        if (updated_text.indexOf(element) == -1) {
            if (updated_text.length + element.length <= MAX_TWEET_SIZE) {
                updated_text = updated_text + "\n" + element
            } else {
                return updated_text
            }
        }
    }
    return updated_text

}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function get_remaining_business_days() {
    var today = new Date()
    var fiscalyearend = new Date(2022, 09, 30)
    var diff = (fiscalyearend.getTime() - today.getTime()) / (1000 * 24 * 60 * 60)
    var bus_days = diff - (diff / 7) * 2
    return Math.floor(bus_days)
}



//setInterval(function () { $("#button").click(); }, 30000);
//downloadTimer();
