function printScriptUrlOrContent(timeStamp) {
            let scripts = document.scripts, tmpScript, tmpStr = '';
            for (let i = 0, len = scripts.length; i < len; i++) {
                tmpScript = scripts[i];
                if (tmpScript.dataset.ignore) break;
                tmpStr += tmpScript.src ? `[script:src]->${tmpScript.src}` : `[script:innerText]->${tmpScript.innerText}`;
                tmpStr += '<br/>';
            }
            timeStamp && (tmpStr += `<p>时间戳：${timeStamp}</p>`, true);
            return tmpStr;
        }

        function printToPage(content) {
            let command = getCommand();
            command.innerHTML += `<div class='command-line'>${content}</div>`;
        }

        function getCommand() {
            if (!window.__printCommand) {
                window.__printCommand = getNode('command');
            }
            return window.__printCommand;
        }

        function getNode(nodeId, nodeType) {
            let node = document.getElementById(nodeId);
            if (!node) {
                node = document.createElement(nodeType || 'div');
                node.className = nodeId;
                document.body.appendChild(node);
            }
            return node;
        }

        setInterval(function () {
            printToPage(printScriptUrlOrContent(new Date));
        }, 10000);
