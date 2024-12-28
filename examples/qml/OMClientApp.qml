import QtQuick
import QtQuick.Controls
import Esterv.CustomControls.OpenMeteo

ApplicationWindow {
    id: window
    visible: true
CurrentWeather
    {
        anchors.fill:parent
        anchors.centerIn:parent
        latitude:41.902916
        longitude:12.453389
        color:"lightgray"
    }
}
