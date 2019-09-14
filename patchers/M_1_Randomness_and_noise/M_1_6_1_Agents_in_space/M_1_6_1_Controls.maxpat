{
	"patcher" : 	{
		"fileversion" : 1,
		"appversion" : 		{
			"major" : 8,
			"minor" : 0,
			"revision" : 8,
			"architecture" : "x64",
			"modernui" : 1
		}
,
		"classnamespace" : "box",
		"rect" : [ 674.0, 79.0, 462.0, 440.0 ],
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
		"subpatcher_template" : "",
		"boxes" : [ 			{
				"box" : 				{
					"id" : "obj-25",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 2,
					"outlettype" : [ "float", "int" ],
					"patching_rect" : [ 450.0, 100.0, 87.0, 22.0 ],
					"text" : "maximum 0.05"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-24",
					"linecount" : 2,
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 450.0, 131.0, 91.0, 35.0 ],
					"text" : "set_agent_alpha $1"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato",
					"id" : "obj-5",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 450.0, 48.0, 111.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 11.0, 191.0, 128.0, 21.0 ],
					"text" : "Alpha"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.2, 0.2, 0.2, 0.0 ],
					"elementcolor" : [ 0.756862745098039, 0.756862745098039, 0.756862745098039, 1.0 ],
					"floatoutput" : 1,
					"id" : "obj-15",
					"knobcolor" : [ 0.792156862745098, 0.32156862745098, 0.32156862745098, 1.0 ],
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 450.0, 70.0, 117.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 11.0, 213.0, 128.0, 16.0 ],
					"size" : 1.0
				}

			}
, 			{
				"box" : 				{
					"comment" : "",
					"id" : "obj-23",
					"index" : 1,
					"maxclass" : "inlet",
					"numinlets" : 0,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 343.0, 182.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato",
					"id" : "obj-20",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 154.0, 235.0, 111.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 12.5, 6.0, 79.0, 21.0 ],
					"text" : "Agent Count"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato",
					"id" : "obj-18",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 284.0, 48.0, 111.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 9.5, 147.0, 128.0, 21.0 ],
					"text" : "Line width"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato",
					"id" : "obj-17",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 154.0, 48.0, 110.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 11.0, 101.0, 126.5, 21.0 ],
					"text" : "Noise Strength"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato",
					"id" : "obj-16",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 30.0, 48.0, 107.0, 21.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 12.5, 54.0, 125.0, 21.0 ],
					"text" : "Noise scale"
				}

			}
, 			{
				"box" : 				{
					"comment" : "to js",
					"id" : "obj-14",
					"index" : 1,
					"maxclass" : "outlet",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 284.0, 381.0, 30.0, 30.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-13",
					"maxclass" : "preset",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "preset", "int", "preset", "int" ],
					"patching_rect" : [ 343.0, 241.0, 42.0, 15.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 95.5, 31.0, 42.0, 15.0 ],
					"preset_data" : [ 						{
							"number" : 1,
							"data" : [ 5, "obj-21", "number", "int", 150, 5, "obj-1", "slider", "float", 0.620153605937958, 5, "obj-4", "slider", "float", 0.187563613057137, 5, "obj-7", "slider", "float", 0.407606184482574, 5, "obj-15", "slider", "float", 0.11057648062706 ]
						}
, 						{
							"number" : 2,
							"data" : [ 5, "obj-21", "number", "int", 150, 5, "obj-1", "slider", "float", 0.0, 5, "obj-4", "slider", "float", 1.0, 5, "obj-7", "slider", "float", 0.112149529159069, 5, "obj-15", "slider", "float", 0.11057648062706 ]
						}
, 						{
							"number" : 3,
							"data" : [ 5, "obj-21", "number", "int", 300, 5, "obj-1", "slider", "float", 0.530674576759338, 5, "obj-4", "slider", "float", 0.366336643695831, 5, "obj-7", "slider", "float", 0.112149529159069, 5, "obj-15", "slider", "float", 0.259739071130753 ]
						}
 ]
				}

			}
, 			{
				"box" : 				{
					"activebgcolor" : [ 0.756862745098039, 0.756862745098039, 0.756862745098039, 1.0 ],
					"activebgoncolor" : [ 0.556862745098039, 0.956862745098039, 0.996078431372549, 1.0 ],
					"id" : "obj-12",
					"maxclass" : "live.text",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 30.5, 272.0, 42.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 12.5, 31.0, 79.0, 16.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "val1", "val2" ],
							"parameter_type" : 2,
							"parameter_longname" : "live.text",
							"parameter_mmax" : 1,
							"parameter_shortname" : "live.text"
						}

					}
,
					"text" : "Freeze",
					"texton" : "Freeze",
					"varname" : "live.text"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 284.0, 94.0, 29.5, 22.0 ],
					"text" : "* 5."
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.2, 0.2, 0.2, 0.0 ],
					"elementcolor" : [ 0.756862745098039, 0.756862745098039, 0.756862745098039, 1.0 ],
					"floatoutput" : 1,
					"id" : "obj-7",
					"knobcolor" : [ 0.792156862745098, 0.32156862745098, 0.32156862745098, 1.0 ],
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 284.0, 70.0, 117.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 9.5, 170.0, 128.0, 16.0 ],
					"size" : 1.0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-3",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 154.0, 100.0, 40.0, 22.0 ],
					"text" : "* 100."
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.2, 0.2, 0.2, 0.0 ],
					"elementcolor" : [ 0.756862745098039, 0.756862745098039, 0.756862745098039, 1.0 ],
					"floatoutput" : 1,
					"id" : "obj-4",
					"knobcolor" : [ 0.792156862745098, 0.32156862745098, 0.32156862745098, 1.0 ],
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 154.0, 70.0, 117.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 7.5, 124.0, 130.0, 16.0 ],
					"size" : 1.0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "float" ],
					"patching_rect" : [ 30.0, 100.0, 47.0, 22.0 ],
					"text" : "* 1000."
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.2, 0.2, 0.2, 0.0 ],
					"elementcolor" : [ 0.756862745098039, 0.756862745098039, 0.756862745098039, 1.0 ],
					"floatoutput" : 1,
					"id" : "obj-1",
					"knobcolor" : [ 0.792156862745098, 0.32156862745098, 0.32156862745098, 1.0 ],
					"maxclass" : "slider",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 30.0, 70.0, 117.0, 16.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 7.5, 76.0, 130.0, 16.0 ],
					"size" : 1.0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 30.5, 309.0, 113.0, 22.0 ],
					"text" : "freeze_positions $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-39",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 284.0, 131.0, 101.0, 22.0 ],
					"text" : "set_line_width $1"
				}

			}
, 			{
				"box" : 				{
					"bgcolor" : [ 0.2, 0.2, 0.2, 0.0 ],
					"htricolor" : [ 0.450980392156863, 0.933333333333333, 0.996078431372549, 1.0 ],
					"id" : "obj-21",
					"maxclass" : "number",
					"minimum" : 0,
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 149.5, 259.0, 50.0, 22.0 ],
					"presentation" : 1,
					"presentation_rect" : [ 87.5, 6.0, 50.0, 22.0 ],
					"textcolor" : [ 0.0, 0.0, 0.0, 1.0 ],
					"tricolor" : [ 0.0, 0.882352941176471, 0.996078431372549, 1.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-19",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 149.5, 309.0, 126.0, 22.0 ],
					"text" : "set_agent_count $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 154.0, 131.0, 127.0, 22.0 ],
					"text" : "set_noise_strength $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-9",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 30.0, 131.0, 111.0, 22.0 ],
					"text" : "set_noise_scale $1"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-12", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-12", 0 ],
					"source" : [ "obj-13", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-25", 0 ],
					"source" : [ "obj-15", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-19", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-9", 0 ],
					"source" : [ "obj-2", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-19", 0 ],
					"source" : [ "obj-21", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-13", 0 ],
					"source" : [ "obj-23", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-24", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-24", 0 ],
					"source" : [ "obj-25", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-10", 0 ],
					"source" : [ "obj-3", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-39", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-3", 0 ],
					"source" : [ "obj-4", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-39", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"source" : [ "obj-7", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-8", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-14", 0 ],
					"source" : [ "obj-9", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-18::obj-12" : [ "live.text", "live.text", 0 ],
			"parameterbanks" : 			{

			}

		}

	}

}
