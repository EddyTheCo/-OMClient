import QtQuick
import QtQuick.Controls
import QtQuick.Layouts
import Esterv.CustomControls.OpenMeteo

ApplicationWindow {
    id: window
    visible: true
    background: Rectangle {
        color: "#10141c"
    }
    Timer {
        id: timer
        interval: 50
        repeat: true
        running: true
        onTriggered: {
            code3.iTime += 0.05;
            code2Am1.iTime += 0.05;
            code2Am0.iTime += 0.05;
            code1Am1.iTime += 0.05;
            code1Am0.iTime += 0.05;
            code0Am1.iTime += 0.05;
            code0Am0.iTime += 0.05;
            code45Am1.iTime += 0.05;
            code45Am0.iTime += 0.05;
            code51Am1.iTime += 0.05;
            code51Am0.iTime += 0.05;
            code53Am1.iTime += 0.05;
            code53Am0.iTime += 0.05;
            code55Am1.iTime += 0.05;
            code55Am0.iTime += 0.05;
            code56Am1.iTime += 0.05;
            code56Am0.iTime += 0.05;
            code57Am1.iTime += 0.05;
            code57Am0.iTime += 0.05;
            code61Am1.iTime += 0.05;
            code61Am0.iTime += 0.05;
            code63Am1.iTime += 0.05;
            code63Am0.iTime += 0.05;
            code65Am1.iTime += 0.05;
            code65Am0.iTime += 0.05;
            code66Am1.iTime += 0.05;
            code66Am0.iTime += 0.05;
            code67Am1.iTime += 0.05;
            code67Am0.iTime += 0.05;
        }
    }
    ScrollView {
        anchors.fill: parent
        contentWidth: width
        contentHeight: parent.width * 0.5 * 15
        GridLayout {
            id: grid
            anchors.fill: parent
            columns: 2

            Rectangle {
                id: code0Am1Box
                color: "transparent"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code0Am1
                    anchors.fill: code0Am1Box
                    property var src: code0Am1Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code0Am1.frag.qsb"
                }
            }
            Rectangle {
                id: code0Am0Box
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code0Am0
                    anchors.fill: code0Am0Box
                    property var src: code0Am0Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code0Am0.frag.qsb"
                }
            }
            Rectangle {
                id: code1Am1Box
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code1Am1
                    anchors.fill: code1Am1Box
                    property var src: code1Am1Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code1Am1.frag.qsb"
                }
            }
            Rectangle {
                id: code1Am0Box
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code1Am0
                    anchors.fill: code1Am0Box
                    property var src: code1Am0Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code1Am0.frag.qsb"
                }
            }

            Rectangle {
                id: code2Am1Box
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code2Am1
                    anchors.fill: code2Am1Box
                    property var src: code2Am1Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code2Am1.frag.qsb"
                }
            }
            Rectangle {
                id: code2Am0Box
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code2Am0
                    anchors.fill: code2Am0Box
                    property var src: code2Am0Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code2Am0.frag.qsb"
                }
            }
            Rectangle {
                id: code3Box
                color: "#10141c"
                width: window.width * 0.5
                height: width

                ShaderEffect {
                    id: code3
                    anchors.fill: code3Box
                    property var src: code3Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code3.frag.qsb"
                }
            }
            Rectangle {
                id: code45Am1Box
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code45Am1
                    anchors.fill: code45Am1Box
                    property var src: code45Am1Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code45Am1.frag.qsb"
                }
            }
            Rectangle {
                id: code45Am0Box
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code45Am0
                    anchors.fill: code45Am0Box
                    property var src: code45Am0Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code45Am0.frag.qsb"
                }
            }
            Rectangle {
                id: code51Am1Box
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code51Am1
                    anchors.fill: code51Am1Box
                    property var src: code51Am1Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code51Am1.frag.qsb"
                }
            }
            Rectangle {
                id: code51Am0Box
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code51Am0
                    anchors.fill: code51Am0Box
                    property var src: code51Am0Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code51Am0.frag.qsb"
                }
            }
            Rectangle {
                id: code53Am1Box
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code53Am1
                    anchors.fill: code53Am1Box
                    property var src: code53Am1Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code53Am1.frag.qsb"
                }
            }
            Rectangle {
                id: code53Am0Box
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code53Am0
                    anchors.fill: code53Am0Box
                    property var src: code53Am0Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code53Am0.frag.qsb"
                }
            }
            Rectangle {
                id: code55Am1Box
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code55Am1
                    anchors.fill: code55Am1Box
                    property var src: code55Am1Box
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code55Am1.frag.qsb"
                }
            }
            Rectangle {
                id: code55Am0Box
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code55Am0
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code55Am0.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code61Am1
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code61Am1.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code61Am0
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code61Am0.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code63Am1
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code63Am1.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code63Am0
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code63Am0.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code65Am1
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code65Am1.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code65Am0
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code65Am0.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code56Am1
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code56Am1.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code56Am0
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code56Am0.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code57Am1
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code57Am1.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code57Am0
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code57Am0.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code66Am1
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code66Am1.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code66Am0
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code66Am0.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code67Am1
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code67Am1.frag.qsb"
                }
            }
            Rectangle {
                color: "#10141c"
                width: window.width * 0.5
                height: width
                ShaderEffect {
                    id: code67Am0
                    anchors.fill: parent
                    property var src: parent
                    property real iTime: 0.0
                    property var pixelStep: Qt.vector2d(1 / src.width, 1 / src.height)
                    fragmentShader: "qrc:/esterVtech.com/imports/Designs/frag/code67Am0.frag.qsb"
                }
            }
        }
    }
}
