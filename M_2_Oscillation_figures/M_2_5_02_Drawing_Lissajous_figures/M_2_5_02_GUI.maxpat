{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 7,
			"minor" : 3,
			"revision" : 5,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"rect" : [ 38.0, 79.0, 1208.0, 687.0 ],
		"bglocked" : 0,
		"openinpresentation" : 1,
		"default_fontsize" : 12.0,
		"default_fontface" : 0,
		"default_fontname" : "Arial",
		"gridonopen" : 1,
		"gridsize" : [ 15.0, 15.0 ],
		"gridsnaponopen" : 1,
		"objectsnaponopen" : 1,
		"statusbarvisible" : 2,
		"toolbarvisible" : 1,
		"lefttoolbarpinned" : 0,
		"toptoolbarpinned" : 0,
		"righttoolbarpinned" : 0,
		"bottomtoolbarpinned" : 0,
		"toolbars_unpinned_last_save" : 0,
		"tallnewobj" : 0,
		"boxanimatetime" : 200,
		"enablehscroll" : 1,
		"enablevscroll" : 1,
		"devicewidth" : 0.0,
		"description" : "",
		"digest" : "",
		"tags" : "",
		"style" : "",
		"subpatcher_template" : "Default Max 7",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 816.0, 461.0, 72.0, 22.0 ],
					"style" : "",
					"text" : "loadmess 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "preset",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "preset", "int", "preset", "int" ],
					"patching_rect" : [ 816.0, 492.0, 100.0, 40.0 ],
					"pattrstorage" : "M_2_5_02_GUI-SETTINGS",
					"presentation" : 1,
					"presentation_rect" : [ 269.987671, 135.0, 100.0, 40.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "", "", "", "" ],
					"patching_rect" : [ 692.0, 502.0, 58.0, 22.0 ],
					"restore" : 					{
						"FreqX" : [ 13.0 ],
						"FreqY" : [ 11.0 ],
						"alpha" : [ 20 ],
						"brightness" : [ 0 ],
						"connect_all_points" : [ 1.0 ],
						"connection_radius" : [ 110.0 ],
						"invert_background" : [ 0.0 ],
						"invert_hue" : [ 0.0 ],
						"max_hue" : [ 100 ],
						"min_hue" : [ 0 ],
						"mod_freq2_amp" : [ 0.0 ],
						"mod_freq2_x" : [ 0.0 ],
						"mod_freq2_y" : [ 0.0 ],
						"mod_freq_x" : [ 0.0 ],
						"mod_freq_y" : [ 0.0 ],
						"phi" : [ 97 ],
						"point_count" : [ 1500 ],
						"saturation" : [ 80 ]
					}
,
					"style" : "",
					"text" : "autopattr",
					"varname" : "u022005490"
				}

			}
, 			{
				"box" : 				{
					"autorestore" : "M_2_5_02_GUI-SETTINGS.json",
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 692.0, 555.0, 227.0, 22.0 ],
					"saved_object_attributes" : 					{
						"client_rect" : [ 100, 100, 500, 600 ],
						"parameter_enable" : 0,
						"storage_rect" : [ 200, 200, 800, 500 ]
					}
,
					"style" : "",
					"text" : "pattrstorage M_2_5_02_GUI-SETTINGS",
					"varname" : "M_2_5_02_GUI-SETTINGS"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Bold",
					"fontsize" : 11.0,
					"id" : "obj-61",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 685.5, 100.0, 99.0, 20.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 16.5, 177.5, 65.666626, 33.0 ],
					"style" : "",
					"text" : "Mod Freq2 Amp",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Black",
					"format" : 6,
					"htricolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"id" : "obj-64",
					"maxclass" : "flonum",
					"mousefilter" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 701.888855, 126.0, 50.0, 23.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 32.0, 208.0, 50.0, 23.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "mod_freq2_amp"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Heavy",
					"fontsize" : 10.0,
					"id" : "obj-57",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 263.611115, 100.0, 26.0, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 106.166626, 196.166672, 30.0, 18.0 ],
					"style" : "",
					"text" : "phi",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"degrees" : 360,
					"id" : "obj-56",
					"maxclass" : "dial",
					"mode" : 2,
					"needlecolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"outlinecolor" : [ 0.376471, 0.384314, 0.4, 0.44 ],
					"parameter_enable" : 0,
					"patching_rect" : [ 256.611115, 117.5, 40.0, 40.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 92.766632, 176.766678, 56.799999, 56.799999 ],
					"size" : 361.0,
					"style" : "",
					"varname" : "phi"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Regular",
					"fontsize" : 8.0,
					"htricolor" : [ 0.815686, 0.858824, 0.34902, 0.0 ],
					"id" : "obj-53",
					"ignoreclick" : 1,
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 859.651245, 404.0, 41.0, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 216.199951, 211.5, 41.0, 18.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"tricolor" : [ 0.490196, 0.498039, 0.517647, 0.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Heavy",
					"fontsize" : 8.0,
					"id" : "obj-54",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 831.953735, 303.0, 48.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 193.474976, 211.5, 40.049995, 16.0 ],
					"style" : "",
					"text" : "alpha:",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"elementcolor" : [ 0.376471, 0.384314, 0.4, 0.38 ],
					"id" : "obj-55",
					"knobcolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"knobshape" : 4,
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 818.703735, 321.0, 71.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 174.599976, 211.5, 79.800003, 16.0 ],
					"prototypename" : "triangle horizontal",
					"size" : 101.0,
					"style" : "",
					"varname" : "alpha"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Regular",
					"fontsize" : 8.0,
					"htricolor" : [ 0.815686, 0.858824, 0.34902, 0.0 ],
					"id" : "obj-48",
					"ignoreclick" : 1,
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 772.166687, 404.0, 41.0, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 216.199951, 192.5, 41.0, 18.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"tricolor" : [ 0.490196, 0.498039, 0.517647, 0.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Heavy",
					"fontsize" : 8.0,
					"id" : "obj-51",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 741.6698, 303.0, 48.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 180.0, 192.5, 49.0, 16.0 ],
					"style" : "",
					"text" : "brightness:",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"elementcolor" : [ 0.376471, 0.384314, 0.4, 0.38 ],
					"id" : "obj-52",
					"knobcolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"knobshape" : 4,
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 728.4198, 321.0, 71.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 174.599976, 192.5, 79.800003, 16.0 ],
					"prototypename" : "triangle horizontal",
					"size" : 101.0,
					"style" : "",
					"varname" : "brightness"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Regular",
					"fontsize" : 8.0,
					"htricolor" : [ 0.815686, 0.858824, 0.34902, 0.0 ],
					"id" : "obj-45",
					"ignoreclick" : 1,
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 685.5, 404.0, 41.0, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 216.199951, 172.5, 41.0, 18.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"tricolor" : [ 0.490196, 0.498039, 0.517647, 0.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Heavy",
					"fontsize" : 8.0,
					"id" : "obj-46",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 651.385803, 303.0, 48.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 180.0, 173.5, 49.0, 16.0 ],
					"style" : "",
					"text" : "saturation:",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"elementcolor" : [ 0.376471, 0.384314, 0.4, 0.38 ],
					"id" : "obj-47",
					"knobcolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"knobshape" : 4,
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 638.135803, 321.0, 71.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 174.599976, 173.5, 79.800003, 16.0 ],
					"prototypename" : "triangle horizontal",
					"size" : 101.0,
					"style" : "",
					"varname" : "saturation"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Regular",
					"fontsize" : 8.0,
					"htricolor" : [ 0.815686, 0.858824, 0.34902, 0.0 ],
					"id" : "obj-42",
					"ignoreclick" : 1,
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 488.251892, 404.0, 41.0, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 215.0, 135.0, 41.0, 18.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"tricolor" : [ 0.490196, 0.498039, 0.517647, 0.0 ]
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Regular",
					"fontsize" : 8.0,
					"htricolor" : [ 0.815686, 0.858824, 0.34902, 0.0 ],
					"id" : "obj-39",
					"ignoreclick" : 1,
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 568.851868, 404.0, 41.0, 18.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 215.0, 153.5, 41.0, 18.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"tricolor" : [ 0.490196, 0.498039, 0.517647, 0.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Heavy",
					"fontsize" : 8.0,
					"id" : "obj-30",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 471.501892, 303.0, 44.5, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 180.0, 136.0, 53.0, 16.0 ],
					"style" : "",
					"text" : "min hue:",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"elementcolor" : [ 0.376471, 0.384314, 0.4, 0.38 ],
					"id" : "obj-31",
					"knobcolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"knobshape" : 4,
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 458.251892, 321.0, 71.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 174.600006, 136.0, 79.800003, 16.0 ],
					"prototypename" : "triangle horizontal",
					"size" : 361.0,
					"style" : "",
					"varname" : "min_hue"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Heavy",
					"fontsize" : 8.0,
					"id" : "obj-7",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 561.101868, 303.0, 44.5, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 180.0, 154.5, 53.0, 16.0 ],
					"style" : "",
					"text" : "max hue:",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"elementcolor" : [ 0.376471, 0.384314, 0.4, 0.38 ],
					"id" : "obj-4",
					"knobcolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"knobshape" : 4,
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 547.851868, 321.0, 71.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 174.600006, 154.5, 79.800003, 16.0 ],
					"prototypename" : "triangle horizontal",
					"size" : 361.0,
					"style" : "",
					"varname" : "max_hue"
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-27",
					"index" : 0,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 78.5, 588.0, 30.0, 30.0 ],
					"style" : ""
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-23",
					"maxclass" : "live.line",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 920.987671, 45.0, 5.0, 100.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 158.166626, 15.0, 6.5, 225.900009 ]
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.6, 0.6, 0.6, 0.0 ],
					"activebgoncolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"appearance" : 1,
					"focusbordercolor" : [ 0.0, 0.019608, 0.078431, 0.0 ],
					"id" : "obj-22",
					"maxclass" : "live.text",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 1089.555786, 318.0, 70.333336, 25.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 269.987671, 78.0, 92.333336, 25.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_linknames" : 1,
							"parameter_longname" : "invert_hue",
							"parameter_shortname" : "live.text",
							"parameter_type" : 2,
							"parameter_mmax" : 1.0,
							"parameter_enum" : [ "val1", "val2" ]
						}

					}
,
					"text" : "Invert hue",
					"texton" : "Invert hue",
					"varname" : "invert_hue"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.6, 0.6, 0.6, 0.0 ],
					"activebgoncolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"appearance" : 1,
					"focusbordercolor" : [ 0.0, 0.019608, 0.078431, 0.0 ],
					"id" : "obj-21",
					"maxclass" : "live.text",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 999.271667, 318.0, 56.333336, 25.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 269.987671, 45.0, 112.333336, 25.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_linknames" : 1,
							"parameter_longname" : "invert_background",
							"parameter_shortname" : "live.text",
							"parameter_type" : 2,
							"parameter_mmax" : 1.0,
							"parameter_enum" : [ "val1", "val2" ]
						}

					}
,
					"text" : "Invert background",
					"texton" : "Invert background",
					"varname" : "invert_background"
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.6, 0.6, 0.6, 0.0 ],
					"activebgoncolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"appearance" : 1,
					"focusbordercolor" : [ 0.0, 0.019608, 0.078431, 0.0 ],
					"id" : "obj-13",
					"maxclass" : "live.text",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 908.987671, 318.0, 75.666672, 25.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 269.987671, 15.999999, 110.333336, 25.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_linknames" : 1,
							"parameter_longname" : "connect_all_points",
							"parameter_shortname" : "live.text",
							"parameter_type" : 2,
							"parameter_mmax" : 1.0,
							"parameter_enum" : [ "val1", "val2" ]
						}

					}
,
					"text" : "Connect all points",
					"texton" : "Connect all points",
					"varname" : "connect_all_points"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-69",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 277.0, 419.0, 152.0, 22.0 ],
					"style" : "",
					"text" : "prepend set_style_params"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-68",
					"maxclass" : "newobj",
					"numinlets" : 10,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 277.0, 365.0, 831.555603, 22.0 ],
					"style" : "",
					"text" : "pak 1500 110. 0 100 80 0 20 1 0 0"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Bold",
					"htricolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"id" : "obj-67",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 277.0, 318.0, 53.0, 23.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 197.0, 39.0, 53.0, 23.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "point_count"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Bold",
					"fontsize" : 12.0,
					"id" : "obj-63",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 277.0, 284.0, 47.0, 35.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 180.0, 16.0, 70.0, 21.0 ],
					"style" : "",
					"text" : "Point count",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-62",
					"maxclass" : "newobj",
					"numinlets" : 8,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 78.5, 166.0, 642.388855, 22.0 ],
					"style" : "",
					"text" : "pak 13. 11. 97. 0. 0. 11. 17. 0."
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Bold",
					"fontsize" : 12.0,
					"id" : "obj-49",
					"linecount" : 2,
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 357.283936, 284.0, 73.0, 35.0 ],
					"presentation" : 1,
					"presentation_linecount" : 2,
					"presentation_rect" : [ 180.0, 68.0, 73.0, 35.0 ],
					"style" : "",
					"text" : "Connection radius",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Bold",
					"format" : 6,
					"htricolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"id" : "obj-50",
					"maxclass" : "flonum",
					"mousefilter" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 367.283936, 318.0, 53.0, 23.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 197.0, 105.0, 53.0, 23.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "connection_radius"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Bold",
					"fontsize" : 11.0,
					"id" : "obj-37",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 594.833252, 100.0, 81.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 16.5, 144.666672, 81.0, 20.0 ],
					"style" : "",
					"text" : "Mod Freq2 Y",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Bold",
					"fontsize" : 11.0,
					"id" : "obj-38",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 507.27771, 100.0, 80.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 16.5, 63.0, 80.0, 20.0 ],
					"style" : "",
					"text" : "Mod Freq2 X",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Bold",
					"fontsize" : 11.0,
					"id" : "obj-36",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 420.222168, 100.0, 73.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 23.166628, 120.666664, 73.0, 20.0 ],
					"style" : "",
					"text" : "Mod Freq Y",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Bold",
					"fontsize" : 11.0,
					"id" : "obj-35",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 329.666626, 100.0, 76.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 23.166626, 39.0, 76.0, 20.0 ],
					"style" : "",
					"text" : "Mod Freq X",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Bold",
					"fontsize" : 11.0,
					"id" : "obj-34",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 167.555542, 100.0, 46.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 52.5, 95.666664, 46.0, 20.0 ],
					"style" : "",
					"text" : "Freq Y",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Bold",
					"fontsize" : 11.0,
					"id" : "obj-32",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 78.5, 100.0, 44.0, 20.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 52.5, 15.0, 44.0, 20.0 ],
					"style" : "",
					"text" : "Freq X",
					"textjustification" : 1
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Black",
					"format" : 6,
					"htricolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"id" : "obj-19",
					"maxclass" : "flonum",
					"mousefilter" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 612.833252, 126.0, 50.0, 23.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 106.166626, 142.666672, 50.0, 23.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "mod_freq2_y"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Black",
					"format" : 6,
					"htricolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"id" : "obj-18",
					"maxclass" : "flonum",
					"mousefilter" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 523.77771, 126.0, 53.0, 23.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 106.166626, 61.5, 53.0, 23.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "mod_freq2_x"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Black",
					"format" : 6,
					"htricolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"id" : "obj-17",
					"maxclass" : "flonum",
					"mousefilter" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 434.722168, 126.0, 49.0, 23.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 106.166626, 119.666664, 49.0, 23.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "mod_freq_y"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Black",
					"format" : 6,
					"htricolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"id" : "obj-16",
					"maxclass" : "flonum",
					"mousefilter" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 345.666626, 126.0, 49.0, 23.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 106.166626, 39.0, 49.0, 23.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "mod_freq_x"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Black",
					"format" : 6,
					"htricolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"id" : "obj-15",
					"maxclass" : "flonum",
					"mousefilter" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 167.555542, 126.0, 53.0, 23.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 106.166626, 95.666664, 53.0, 23.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "FreqY"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.290196, 0.309804, 0.301961, 0.0 ],
					"fontname" : "Lato Black",
					"format" : 6,
					"htricolor" : [ 0.541176, 0.815686, 0.913725, 1.0 ],
					"id" : "obj-14",
					"maxclass" : "flonum",
					"mousefilter" : 1,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 78.5, 126.0, 50.0, 23.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 106.166626, 15.0, 50.0, 23.0 ],
					"style" : "",
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"varname" : "FreqX"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 78.5, 243.0, 148.0, 22.0 ],
					"style" : "",
					"text" : "prepend set_freq_params"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 7 ],
					"source" : [ "obj-13", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-62", 0 ],
					"source" : [ "obj-14", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-62", 1 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-62", 3 ],
					"source" : [ "obj-16", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-62", 4 ],
					"source" : [ "obj-17", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-62", 5 ],
					"source" : [ "obj-18", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-62", 6 ],
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 8 ],
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 9 ],
					"source" : [ "obj-22", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-42", 0 ],
					"order" : 0,
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 2 ],
					"order" : 1,
					"source" : [ "obj-31", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"order" : 0,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 3 ],
					"order" : 1,
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-45", 0 ],
					"order" : 0,
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 4 ],
					"order" : 1,
					"source" : [ "obj-47", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 1 ],
					"source" : [ "obj-50", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-48", 0 ],
					"order" : 0,
					"source" : [ "obj-52", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 5 ],
					"order" : 1,
					"source" : [ "obj-52", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-53", 0 ],
					"order" : 0,
					"source" : [ "obj-55", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 6 ],
					"order" : 1,
					"source" : [ "obj-55", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-62", 2 ],
					"source" : [ "obj-56", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-11", 0 ],
					"source" : [ "obj-62", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-62", 7 ],
					"source" : [ "obj-64", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-68", 0 ],
					"source" : [ "obj-67", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 0 ],
					"source" : [ "obj-68", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-27", 0 ],
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-8", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-22" : [ "invert_hue", "live.text", 0 ],
			"obj-13" : [ "connect_all_points", "live.text", 0 ],
			"obj-21" : [ "invert_background", "live.text", 0 ]
		}
,
		"dependency_cache" : [ 			{
				"name" : "M_2_5_02_GUI-SETTINGS.json",
				"bootpath" : "~/Documents/Generative_Design_MaxMSP/M_2_Oscillation_figures/M_2_5_02_Drawing_Lissajous_figures",
				"patcherrelativepath" : ".",
				"type" : "JSON",
				"implicit" : 1
			}
 ],
		"autosave" : 0,
		"bgfillcolor_type" : "gradient",
		"bgfillcolor_color1" : [ 0.376471, 0.384314, 0.4, 1.0 ],
		"bgfillcolor_color2" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
		"bgfillcolor_color" : [ 0.290196, 0.309804, 0.301961, 1.0 ],
		"bgfillcolor_angle" : 270.0,
		"bgfillcolor_proportion" : 0.39
	}

}
