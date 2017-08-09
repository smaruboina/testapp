
    jQuery.fn.highlight = function(pat) {
        function innerHighlight(node, pat) {
            var skip = 0;
            if (node.nodeType == 3) {
                var pos = node.data.toUpperCase().indexOf(pat);
                if (pos >= 0) {
                    var spannode = document.createElement('span');
                    spannode.className = 'highlight';
                    var middlebit = node.splitText(pos);
                    var endbit = middlebit.splitText(pat.length);
                    var middleclone = middlebit.cloneNode(true);
                    spannode.appendChild(middleclone);
                    middlebit.parentNode.replaceChild(spannode, middlebit);
                    skip = 1;
                }
            } else if (node.nodeType == 1 && node.childNodes && !/(script|style)/i.test(node.tagName)) {
                for (var i = 0; i < node.childNodes.length; ++i) {
                    i += innerHighlight(node.childNodes[i], pat);
                }
            }
            return skip;
        }
        return this.each(function() {
            innerHighlight(this, pat.toUpperCase());
        });
    };

    jQuery.fn.removeHighlight = function() {
        function newNormalize(node) {
            for (var i = 0, children = node.childNodes, nodeCount = children.length; i < nodeCount; i++) {
                var child = children[i];
                if (child.nodeType == 1) {
                    newNormalize(child);
                    continue;
                }
                if (child.nodeType != 3) {
                    continue;
                }
                var next = child.nextSibling;
                if (next == null || next.nodeType != 3) {
                    continue;
                }
                var combined_text = child.nodeValue + next.nodeValue;
                new_node = node.ownerDocument.createTextNode(combined_text);
                node.insertBefore(new_node, child);
                node.removeChild(child);
                node.removeChild(next);
                i--;
                nodeCount--;
            }
        }

        return this.find("span.highlight").each(function() {
            var thisParent = this.parentNode;
            thisParent.replaceChild(this.firstChild, this);
            newNormalize(thisParent);
        }).end();
    };

    function getData() {
        var url = document.getElementById("query").value;

        // use ajaxPrefilter + heroku cors-anywhere
        $.ajaxPrefilter(function(options) {
            if (options.crossDomain && jQuery.support.cors) {
                options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
            }
        });

        $.ajax({
            url: url,
            dataType: 'html',
            type: 'POST',
            success: function(response, status) {

                $('#responseData').text(response);
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                console.log('AJAX error:' + textStatus);
            }
        });
    }


    document.getElementById('responseData').addEventListener("dblclick", function() {
        selectedtext = "";
        if (window.getSelection().anchorNode != null) {
            selectedtext = window.getSelection().anchorNode.textContent.substring(
                window.getSelection().anchorOffset,
                window.getSelection().focusOffset);
        }

        $('#responseData').removeHighlight();
        if (selectedtext != "") {
            selectedtext = $.trim(selectedtext);
            $('#responseData').highlight(selectedtext);
        }
    });
    var event = new MouseEvent('dblclick', {
        'view': window,
        'bubbles': true,
        'cancelable': true
    });
    document.getElementById('responseData').dispatchEvent(event);
