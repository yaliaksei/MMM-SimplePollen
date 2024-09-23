# MMM-SimplePollen
MagicMirror module to display pollen information

## Installation

In the terminal, go to your's MagicMirror intsallation folder and execute the following command:

```
cd modules
```

Clone this repository

```
git clone https://github.com/yaliaksei/MMM-SimplePollen.git
```

## Usage and config

Add following module configuration in config.js

```
...
{
			module: "MMM-SimplePollen",
			position: "top_left", // any poisition of your choice
			config: {
				apiKey: "actual_api_key", // Get API key for Pollen API from Google Console
				latitude: XX.xx, // actual latitude
				longitude: YY.yy, // actual longitude
				days: 1, // forecast days, now ignored
			}
		},
...
```
