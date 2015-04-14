
var messageList = [];

var uniqueId = function() {
    var date = Date.now();
    var random = Math.random() * Math.random();

    return Math.floor(date * random).toString();
};

var theMessage = function(text, name) {
    return {
        nick: name,
        message: text,
        id: uniqueId()
    };
};

function createAllTasks(allTasks) {
    for(var i = 0; i < allTasks.length; i++){
        task = allTasks[i];
        messageDiv = $('.exampleMessage').first().clone();
        messageDiv.find('.nick').html(task.nick + ":");
        messageDiv.find('.message').html(task.message);
        messageDiv.attr('message-id', task.id);
        $('#showMessage').append(messageDiv.show());
        messageList.push(allTasks[i]);
    }
}

function store(listToSave) {

    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    localStorage.setItem("Chat messageList", JSON.stringify(listToSave));
}

function restoreMessages() {
    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    var item = localStorage.getItem("Chat messageList");

    return item && JSON.parse(item);
}

function restoreName(){
    if(typeof(Storage) == "undefined") {
        alert('localStorage is not accessible');
        return;
    }

    var item = localStorage.getItem("Chat userName");


    $('#messageArea').attr('disabled', false);
    $('#send').attr('disabled', false);

    return item && JSON.parse(item);
}


$(document).ready(function () {

    $userName = $('h4.currentName');
    $inputChange = $('#changeName');

    var allMessages = restoreMessages() || [];
    createAllTasks(allMessages);
    $userName.html(restoreName() || "Имя пользователя");

    //enter in chat
    $('#submitUser').click(function () {    
        if ($('#userLogin').val() != "") {
            userName = $('#userLogin').val();
            $userName.html(userName);
            $('#userLogin').val('');
            $('#messageArea').attr('disabled', false);
            $('#send').attr('disabled', false);

            localStorage.setItem("Chat userName", JSON.stringify($userName.html()));
        };
    })

    //change name
    $('#changeCurrentName').click(function () {
        name = $userName.html();
        $userName.hide();
        $inputChange.attr('disabled', false);
        $inputChange.val(name);
        $inputChange.show();
        $(this).hide();
        $('#saveCurrentName').show();
    })

    // save change name
    $('#saveCurrentName').click(function () {
        name = $inputChange.val();
        if (name != "") {
        $inputChange.attr('disabled', true);
        $inputChange.hide();
        $userName.html(name);
        $(this).hide();
        $('#changeCurrentName').show()
        $userName.show();

        localStorage.setItem("Chat userName", JSON.stringify($userName.html()));
        };
    })

    //send message
    $('#send').click(function () {
        message = $('#messageArea').val();
        if (message != "") {
            task = theMessage(message,$userName.html(),true);
            messageList.push(task);
            messageDiv = $('.exampleMessage').first().clone();
            messageDiv.find('.nick').html($userName.html() + ":");
            messageDiv.find('.message').html(message);
            messageDiv.attr('message-id', uniqueId());
            $('#showMessage').append(messageDiv.show());
            $('#messageArea').val('');
        };
        store(messageList);
    })
})