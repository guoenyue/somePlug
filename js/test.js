// 测试工具文件

function filterProp(target, reg, type) {
    let tmp = [];
    for (let i in target) {
        reg.test(i) && filterType(target[i], type) && tmp.push(`属性：${i}是${target[i]}`);
    }
    return tmp.join('</br>');
}
function filterType(data, types) {

    let type = getType(types),
        inResultType = {},
        outResultType = {};
    switch (type) {
        case 'Array':
            types.forEach(function (inType) {
                makeData(inType);
            });
            break;
        case 'String':
            makeData(types);
            break;
        case 'Object':
            for (let i in types) {
                if (types[i]) {
                    inResultType[i] = true;
                } else {
                    outResultType[i] = true;
                }
            }
            break;
    }

    function makeData(type) {
        if (isFit(type)) {
            inResultType[type] = true;
        } else {
            outResultType[type] = true;
        }
    }

    return inResultType[getType(data).toLowerCase()];

}

function isFit(str) {
    return /^\+?(?!(\-|\!))/.test(str);
}

function getType(any) {
    return Object.prototype.toString.call(any).slice(8, -1);
}
