# KioskApp
The Kiosk Application

## Synopsis

This project builds a cross-platform electron executable that will display and allow searching of component inventory.

## Overview

This application was built using electron, AngularJs, NodeJs and other packages.  See [package.json](package.json) for the full list.
KioskApp interfaces with MongoDB to display inventory information and alter inventory quantities.  However, modifications to allow other database access is possible.

## Motivation

This project was built for [Spokane Create's](http://spokanecreate.org/) parts kiosk.  The kiosk is a rolling wall that contains bins of various electronic components.
The KioskApp was built to allow users to search for parts and track part inventory.

## Installation

>> npm install
Then copy example.env to .env
>> npm start

## Contributors

John Mark Wilkinson
Nathan Cutler

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
