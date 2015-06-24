function NodePrompt() {
    this.render = function(value, is, lab, outputChar) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogueoverlay = document.getElementById('dialogueoverlay');
        var dialoguebox = document.getElementById('dialoguebox');
        dialogueoverlay.style.display = "block";
        dialogueoverlay.style.height = winH+"px";
        dialoguebox.style.left = (winW/2) - (550/2)+"px";
        dialoguebox.style.top = "100px";
        dialoguebox.style.display = "block";
        document.getElementById('dialogueboxhead').innerHTML = "Edit Node <b>" + value + ":</b>";
        document.getElementById('dialogueboxbody').innerHTML = 'Initial State:<input type="checkbox" id="initial_state">';
        document.getElementById('dialogueboxbody').innerHTML += '<br>Output Character: <input id="moore">';
        document.getElementById('dialogueboxbody').innerHTML += '<br>State Label: <input id="label">';
        document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="ok()">OK</button> <button onclick="terminate()">Cancel</button>';
        if (is) {
            document.getElementById('initial_state').checked = true;
        }
        if (lab) {
            document.getElementById('label').value = lab;
        }
        if (outputChar != lambda && outputChar != epsilon) {
            document.getElementById('moore').value = outputChar;
        }
        document.getElementById('moore').focus();
    }
    terminate = function() {
        document.getElementById('dialoguebox').style.display = "none";
        document.getElementById('dialogueoverlay').style.display = "none";
    }
    ok = function() {
        var initial_state = document.getElementById('initial_state').checked;
        var node_label = document.getElementById('label').value;
        var output_char = document.getElementById('moore').value;
        if (output_char === "") {
            output_char = emptystring;
        }
        window["updateNode"](initial_state, node_label, output_char);
        this.terminate();
    }
}

function EdgePrompt() {
    this.render = function(value) {
        var winW = window.innerWidth;
        var winH = window.innerHeight;
        var dialogueoverlay = document.getElementById('dialogueoverlay');
        var dialoguebox = document.getElementById('dialoguebox');
        dialogueoverlay.style.display = "block";
        dialogueoverlay.style.height = winH+"px";
        dialoguebox.style.left = (winW/2) - (550/2)+"px";
        dialoguebox.style.top = "100px";
        dialoguebox.style.display = "block";
        document.getElementById('dialogueboxbody').innerHTML = 'Accepted Character: <input id="transition">';
        if(value === ""){
            document.getElementById('dialogueboxhead').innerHTML = "Create Edge:";
            document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="addEdge()">OK</button> <button onclick="end()">Cancel</button>';
        }
        else {
            document.getElementById('dialogueboxhead').innerHTML = "Edit Edge:";
            document.getElementById('dialogueboxfoot').innerHTML = '<button onclick="changeEdge()">OK</button> <button onclick="end()">Cancel</button>';
            var values = value.split("<br>");
            for (var i = 0; i < values.length; i++) {
                if (values[i] == lambda || values[i] == epsilon) {
                    values[i] = "";
                }
            }
            document.getElementById('transition').value = values.join(",");
        }
        document.getElementById('transition').focus();
    }
    end = function() {
        document.getElementById('dialoguebox').style.display = "none";
        document.getElementById('dialogueoverlay').style.display = "none";
    }
    addEdge = function() {
        var value = document.getElementById('transition').value;
        var values = value.split(",");
        for (var i = 0; i < values.length; i++) {
            if (values[i] === "") {
                values[i] = emptystring;
            }
        }
        var edge_label = values[0];
        for (var j = 1; j < values.length; j++) {
            if(values.indexOf(values[j]) === j) {
                edge_label += "<br>" + values[j];
            }
        }
        window["createEdge"](edge_label);
        this.end();
    }
    changeEdge = function() {
        var value = document.getElementById('transition').value;
        var values = value.split(",");
        for (var i = 0; i < values.length; i++) {
            if (values[i] === "") {
                values[i] = emptystring;
            }
        }
        var edge_label = values[0];
        for (var j = 1; j < values.length; j++) {
            if(values.indexOf(values[j]) === j) {
                edge_label += "<br>" + values[j];
            }
        }
        window["updateEdge"](edge_label);
        this.end();
    }
}