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
		"rect" : [ 39.0, 79.0, 977.0, 498.0 ],
		"bglocked" : 0,
		"openinpresentation" : 0,
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
					"fontface" : 0,
					"fontname" : "Arial",
					"fontsize" : 12.0,
					"id" : "obj-16",
					"maxclass" : "jit.fpsgui",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "" ],
					"patching_rect" : [ 233.5, 182.0, 78.0, 35.0 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Regular",
					"fontsize" : 12.0,
					"id" : "obj-15",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 324.5, 187.0, 58.0, 21.0 ],
					"text" : "Line Cap"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Regular",
					"fontsize" : 12.0,
					"id" : "obj-14",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 836.5, 156.0, 75.0, 21.0 ],
					"text" : "Colour R"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Regular",
					"fontsize" : 12.0,
					"id" : "obj-13",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 676.5, 156.0, 75.0, 21.0 ],
					"text" : "Colour L"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Regular",
					"fontsize" : 12.0,
					"id" : "obj-12",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 528.5, 187.0, 75.0, 21.0 ],
					"text" : "Line width R"
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Regular",
					"fontsize" : 12.0,
					"id" : "obj-9",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 446.0, 187.0, 75.0, 21.0 ],
					"text" : "Line width L"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-11",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 457.0, 31.0, 72.0, 22.0 ],
					"text" : "loadmess 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-10",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 446.0, 422.0, 77.0, 22.0 ],
					"text" : "exportimage"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-8",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "jit_matrix", "" ],
					"patching_rect" : [ 324.5, 422.0, 111.0, 22.0 ],
					"text" : "jit.matrix @adapt 1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-5",
					"maxclass" : "preset",
					"numinlets" : 1,
					"numoutlets" : 4,
					"outlettype" : [ "preset", "int", "preset", "int" ],
					"patching_rect" : [ 457.0, 72.0, 100.0, 40.0 ],
					"preset_data" : [ 						{
							"number" : 1,
							"data" : [ 5, "obj-43", "number", "int", 1, 5, "obj-44", "number", "int", 1, 5, "obj-49", "live.menu", "float", 2.0, 11, "obj-50", "swatch", "list", 0.0, 0.0, 0.0, 1.0, 0.550781, 1.0, 0.0, 11, "obj-56", "swatch", "list", 0.0, 0.0, 0.0, 1.0, 0.097656, 1.0, 0.0, 5, "obj-72", "flonum", "float", 1.0, 5, "obj-73", "flonum", "float", 1.0 ]
						}
, 						{
							"number" : 2,
							"data" : [ 5, "obj-43", "number", "int", 10, 5, "obj-44", "number", "int", 20, 5, "obj-49", "live.menu", "float", 0.0, 11, "obj-50", "swatch", "list", 0.0, 0.0, 0.0, 1.0, 0.566406, 1.0, 0.0, 11, "obj-56", "swatch", "list", 0.0, 0.0, 0.0, 1.0, 0.308594, 1.0, 0.0, 5, "obj-72", "flonum", "float", 1.0, 5, "obj-73", "flonum", "float", 1.0 ]
						}
, 						{
							"number" : 3,
							"data" : [ 5, "obj-43", "number", "int", 13, 5, "obj-44", "number", "int", 7, 5, "obj-49", "live.menu", "float", 1.0, 11, "obj-50", "swatch", "list", 0.0, 0.059082, 0.6875, 1.0, 0.652344, 1.0, 0.34375, 11, "obj-56", "swatch", "list", 0.501465, 0.0, 0.8125, 1.0, 0.769531, 1.0, 0.40625, 5, "obj-72", "flonum", "float", 1.0, 5, "obj-73", "flonum", "float", 1.0 ]
						}
, 						{
							"number" : 4,
							"data" : [ 5, "obj-43", "number", "int", 17, 5, "obj-44", "number", "int", 17, 5, "obj-49", "live.menu", "float", 2.0, 11, "obj-50", "swatch", "list", 0.0, 0.0, 0.0, 1.0, 0.167969, 1.0, 0.0, 11, "obj-56", "swatch", "list", 1.0, 0.875488, 0.0625, 1.0, 0.144531, 1.0, 0.53125, 5, "obj-72", "flonum", "float", 1.0, 5, "obj-73", "flonum", "float", 1.0 ]
						}
, 						{
							"number" : 5,
							"data" : [ 5, "obj-43", "number", "int", 99, 5, "obj-44", "number", "int", 55, 5, "obj-49", "live.menu", "float", 0.0, 11, "obj-50", "swatch", "list", 0.6875, 0.0, 0.467285, 0.46, 0.886719, 1.0, 0.34375, 11, "obj-56", "swatch", "list", 0.0625, 0.67041, 1.0, 1.0, 0.558594, 1.0, 0.53125, 5, "obj-72", "flonum", "float", 0.46, 5, "obj-73", "flonum", "float", 1.0 ]
						}
, 						{
							"number" : 6,
							"data" : [ 5, "obj-43", "number", "int", 12, 5, "obj-44", "number", "int", 13, 5, "obj-49", "live.menu", "float", 1.0, 11, "obj-50", "swatch", "list", 1.0, 0.125, 0.842773, 0.5, 0.863281, 1.0, 0.5625, 11, "obj-56", "swatch", "list", 0.0, 0.259277, 0.5625, 0.5, 0.589844, 1.0, 0.28125, 5, "obj-72", "flonum", "float", 0.5, 5, "obj-73", "flonum", "float", 0.5 ]
						}
, 						{
							"number" : 7,
							"data" : [ 5, "obj-43", "number", "int", 12, 5, "obj-44", "number", "int", 12, 5, "obj-49", "live.menu", "float", 2.0, 11, "obj-50", "swatch", "list", 0.3125, 0.790527, 1.0, 0.5, 0.550781, 1.0, 0.65625, 11, "obj-56", "swatch", "list", 0.0, 1.0, 0.742188, 0.5, 0.457031, 1.0, 0.5, 5, "obj-72", "flonum", "float", 0.5, 5, "obj-73", "flonum", "float", 0.5 ]
						}
, 						{
							"number" : 8,
							"data" : [ 5, "obj-43", "number", "int", 25, 5, "obj-44", "number", "int", 50, 5, "obj-49", "live.menu", "float", 1.0, 11, "obj-50", "swatch", "list", 1.0, 0.358887, 0.1875, 1.0, 0.035156, 1.0, 0.59375, 11, "obj-56", "swatch", "list", 0.0, 0.259277, 0.5625, 1.0, 0.589844, 1.0, 0.28125, 5, "obj-72", "flonum", "float", 1.0, 5, "obj-73", "flonum", "float", 1.0 ]
						}
 ]
				}

			}
, 			{
				"box" : 				{
					"fontname" : "Lato Bold",
					"fontsize" : 36.0,
					"id" : "obj-7",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 25.0, 9.0, 345.0, 50.0 ],
					"text" : "Alignment in a grid"
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-73",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 841.5, 182.0, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"format" : 6,
					"id" : "obj-72",
					"maxclass" : "flonum",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 680.5, 182.0, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-70",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 680.5, 213.0, 57.0, 22.0 ],
					"text" : "alpha $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-69",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 841.5, 213.0, 57.0, 22.0 ],
					"text" : "alpha $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-67",
					"maxclass" : "comment",
					"numinlets" : 1,
					"numoutlets" : 0,
					"patching_rect" : [ 223.0, 367.0, 118.0, 20.0 ],
					"text" : "new random seed"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-55",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 841.5, 293.0, 156.0, 22.0 ],
					"text" : "set_color_right $1 $2 $3 $4"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-56",
					"maxclass" : "swatch",
					"numinlets" : 3,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 841.5, 248.0, 128.0, 32.0 ],
					"saturation" : 1.0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-54",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 680.5, 293.0, 149.0, 22.0 ],
					"text" : "set_color_left $1 $2 $3 $4"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-50",
					"maxclass" : "swatch",
					"numinlets" : 3,
					"numoutlets" : 2,
					"outlettype" : [ "", "float" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 680.5, 248.0, 128.0, 32.0 ],
					"saturation" : 1.0
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-49",
					"maxclass" : "live.menu",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "", "float" ],
					"parameter_enable" : 1,
					"patching_rect" : [ 324.5, 213.0, 52.0, 15.0 ],
					"saved_attribute_attributes" : 					{
						"valueof" : 						{
							"parameter_enum" : [ "butt", "round", "square" ],
							"parameter_type" : 2,
							"parameter_longname" : "live.menu",
							"parameter_mmax" : 2,
							"parameter_shortname" : "live.menu"
						}

					}
,
					"varname" : "live.menu"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-46",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 341.0, 244.0, 95.0, 22.0 ],
					"text" : "set_line_cap $1"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-44",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 536.0, 213.0, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-43",
					"maxclass" : "number",
					"numinlets" : 1,
					"numoutlets" : 2,
					"outlettype" : [ "", "bang" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 457.0, 213.0, 50.0, 22.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-41",
					"maxclass" : "newobj",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 457.0, 258.0, 98.0, 22.0 ],
					"text" : "pak 2 2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-38",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 457.0, 293.0, 147.0, 22.0 ],
					"text" : "set_stroke_weights $1 $2"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-36",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 152.0, 367.0, 65.0, 22.0 ],
					"text" : "new_seed"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-33",
					"maxclass" : "message",
					"numinlets" : 2,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 53.0, 318.0, 37.0, 22.0 ],
					"text" : "draw"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-6",
					"maxclass" : "toggle",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "int" ],
					"parameter_enable" : 0,
					"patching_rect" : [ 53.0, 101.0, 24.0, 24.0 ]
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-2",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 3,
					"outlettype" : [ "", "bang", "" ],
					"patching_rect" : [ 53.0, 143.0, 380.0, 22.0 ],
					"text" : "jit.world P_2_1_1 @floating 1 @fsaa 1 @size 500 500 @dim 500 500"
				}

			}
, 			{
				"box" : 				{
					"id" : "obj-1",
					"maxclass" : "newobj",
					"numinlets" : 1,
					"numoutlets" : 1,
					"outlettype" : [ "" ],
					"patching_rect" : [ 53.0, 367.0, 83.0, 22.0 ],
					"saved_object_attributes" : 					{
						"filename" : "P_2_1_1.js",
						"parameter_enable" : 0
					}
,
					"text" : "js P_2_1_1.js"
				}

			}
 ],
		"lines" : [ 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"midpoints" : [ 62.5, 406.0, 17.0, 406.0, 17.0, 132.0, 62.5, 132.0 ],
					"order" : 1,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"order" : 0,
					"source" : [ "obj-1", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-8", 0 ],
					"source" : [ "obj-10", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-5", 0 ],
					"source" : [ "obj-11", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-16", 0 ],
					"order" : 0,
					"source" : [ "obj-2", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-33", 0 ],
					"midpoints" : [ 243.0, 168.0, 219.0, 168.0, 219.0, 303.0, 62.5, 303.0 ],
					"order" : 1,
					"source" : [ "obj-2", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-33", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"source" : [ "obj-36", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"midpoints" : [ 466.5, 354.0, 62.5, 354.0 ],
					"source" : [ "obj-38", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-38", 0 ],
					"source" : [ "obj-41", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-41", 0 ],
					"source" : [ "obj-43", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-41", 1 ],
					"source" : [ "obj-44", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"midpoints" : [ 350.5, 354.0, 62.5, 354.0 ],
					"source" : [ "obj-46", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-46", 0 ],
					"source" : [ "obj-49", 1 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-6", 0 ],
					"hidden" : 1,
					"source" : [ "obj-5", 2 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-54", 0 ],
					"source" : [ "obj-50", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"midpoints" : [ 690.0, 354.0, 62.5, 354.0 ],
					"source" : [ "obj-54", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-1", 0 ],
					"midpoints" : [ 851.0, 354.0, 62.5, 354.0 ],
					"source" : [ "obj-55", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-55", 0 ],
					"source" : [ "obj-56", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-2", 0 ],
					"source" : [ "obj-6", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-56", 0 ],
					"source" : [ "obj-69", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-50", 0 ],
					"source" : [ "obj-70", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-70", 0 ],
					"source" : [ "obj-72", 0 ]
				}

			}
, 			{
				"patchline" : 				{
					"destination" : [ "obj-69", 0 ],
					"source" : [ "obj-73", 0 ]
				}

			}
 ],
		"parameters" : 		{
			"obj-49" : [ "live.menu", "live.menu", 0 ],
			"parameterbanks" : 			{

			}

		}
,
		"dependency_cache" : [ 			{
				"name" : "P_2_1_1.js",
				"bootpath" : "~/Developer/Generative_Design_MaxMSP/patchers/P_2_Hello_Shape/P_2_1_1_Alignment_in_a_grid",
				"patcherrelativepath" : ".",
				"type" : "TEXT",
				"implicit" : 1
			}
 ],
		"autosave" : 0
	}

}
