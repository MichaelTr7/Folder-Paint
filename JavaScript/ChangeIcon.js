const { spawn, exec } = require('child_process');



window.onload = function(){
    console.log("Running: ");
    ChangeIcon();
}

function ChangeIcon(){

var Icon_Path = "/Users/laptop/Desktop/Keynote.icns";
var Folder_Path = "/Users/laptop/Desktop/Blender";

var Command_Refresh_Finder = `
tell application "Finder"
    quit
end tell
delay 1
tell application "Finder"
    activate
end tell
`
var Command_Change_Icon = `
folderpath="/Users/laptop/Desktop/Blender"
icon="/Users/laptop/Desktop/Keynote.icns"

# Recursively delete any old icons in the folder path
find "$folderpath" -name "Icon\r" -exec rm -rf {} +

# Add a Finder icon to the image file and redirect output to /dev/null
sips -i "$icon" >/dev/null

# Only read files with icns, and store resource in a temp file
DeRez -only icns "$icon" > /tmp/icns.rsrc

# Append the new icon based on the folder path
Rez -append /tmp/icns.rsrc -o "$folderpath"/Icon\r

# Remove custom icons from the folder
SetFile -a C "$folderpath"

# Set the icon file to be invisible in Finder
SetFile -a V "$folderpath"/Icon\r

killall Finder
`;

exec(Command_Change_Icon);
exec(Command_Refresh_Finder);


}