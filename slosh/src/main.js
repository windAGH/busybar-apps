// Slosh: a tank of water on the BUSY Bar, to look at and to play with. Start pushes the water in the middle,
// turning the knob tilts the tank, OK opens a page of two steps: the eight waters, then what floats on it (a duck,
// a boat ...). The water is simulated: 18 columns with a height and a speed each, moved on by the real
// time between two pictures, so waves travel, come back from the walls, cross and die down at their true speed.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read; the
// sources' comments are left out to keep it short):
// D = generated data (the eight waters' colours, the ready columns of the picture, the patterns of light, the
// floating things' drawings, the guide's pages), then the bar (its API, its controls), then the app (the water, the
// picture, the colours, the round corners, the floating thing, what is kept and the settings, the guide, the loop).

const D = {"app":"io.github.windagh.slosh","name":"Slosh","ver":"1.0.0","w":{"names":["CLEAR","DEEP SEA","MINT","ROSE","WHISKY","INK","MERCURY","RAINBOW"],"ramps":[[0,1295,2334,3630,4669,5964,8029,11380,14986,18593,22199,25806,29412,557555,1937910,3318264,4633083,6013693,7787007,10346495,12971263,15530751],[0,780,1559,2083,2863,3642,4935,6998,9060,11123,13186,15248,17311,20651,25523,30394,35266,40137,1421523,5359586,9231856,13169919],[0,2055,4109,5908,7963,10018,13355,19259,25164,31068,36972,42876,48780,708763,2415271,4056244,5697216,7403980,9240536,11337698,13434860,15532022],[0,786694,1507852,2294546,3081240,3802398,4851750,6557747,8197952,9903948,11544153,13184614,14890354,15942015,16143499,16279448,16480676,16616624,16753086,16759759,16766177,16772850],[0,721920,1378048,2099968,2756096,3478016,4462848,6105090,7747075,9389316,10966021,12608006,14250247,15368205,15633690,15964966,16296243,16561984,16762198,16766078,16769958,16773838],[0,262412,524823,852771,1115183,1377594,1837130,2690658,3544442,4332434,5185962,6039746,6827738,7748074,8670446,9592819,10580472,11502844,12491263,13612031,14667007,15787775],[0,263430,526861,790035,1053465,1251360,1712169,2633530,3554890,4410459,5331819,6187644,7109004,8096156,9214380,10332603,11450827,12569306,13687271,14673391,15725303,16777215]],"rb":[[0,1806,3613,5675,7482,9288,77146,211569,345736,480159,614326,814285,948452,1607155,3052278,4562680,6007547,7518205,9225727,11326975,13494015,15595263],[0,14,29,43,58,72,65882,197489,329096,460703,592310,789709,921316,1579251,3026678,4539896,5987323,7500541,9211135,11316479,13487615,15592959],[0,458766,917533,1441835,1900602,2359368,2949466,3801969,4588936,5441439,6228406,7081165,7868132,8722675,9580278,10372600,11164667,12022525,12946687,14003455,15126015,16182783],[0,917518,1900573,2818091,3801146,4718664,5898586,7406449,8914312,10422175,11930038,13438157,14946020,15931635,16133878,16270840,16473083,16610045,16747775,16755967,16764415,16772607],[0,917511,1900558,2818070,3801117,4718628,5898541,7406394,8914246,10422099,11929951,13438060,14945912,15931525,16133778,16270750,16473002,16609975,16747717,16755925,16764390,16772598],[0,917504,1900544,2818048,3801088,4718592,5898497,7406339,8914181,10422023,11929865,13437964,14945806,15931416,16133678,16270661,16472923,16609906,16747660,16755884,16764365,16772589],[0,919296,1904128,2823680,3808512,4727808,5909761,7420419,8930821,10441479,11951881,13462540,14972942,15959320,16159278,16293445,16493147,16627570,16762252,16766380,16770765,16774893],[0,921088,1907968,2829056,3815936,4737024,5921281,7434499,8947717,10460935,11974153,13487372,15000590,15987480,16184878,16316485,16513883,16645490,16777100,16777132,16777165,16777197],[0,462336,924928,1452800,1915392,2377728,2972161,3830019,4622341,5480199,6272521,7130380,7922702,8778520,9631278,10418245,11205467,12057970,12976012,14024620,15138765,16187373],[0,3584,7424,11008,14848,18432,88577,225539,362501,499463,636425,838924,975886,1635096,3077678,4585541,6028123,7535986,9240460,11337644,13500365,15597549],[0,3591,7438,11030,14877,18468,88621,225594,362566,499539,636511,839020,975992,1635205,3077778,4585630,6028202,7536055,9240517,11337685,13500390,15597558],[0,3598,7453,11051,14906,18504,88666,225649,362632,499615,636598,839117,976100,1635315,3077878,4585720,6028283,7536125,9240575,11337727,13500415,15597567]],"rbMs":5000,"pips":[282774,12650,426336,9840718,9522952,4793233,5002592],"pipTone":13,"hex":"000102030405060708090A0B0C0D0E0F101112131415161718191A1B1C1D1E1F202122232425262728292A2B2C2D2E2F303132333435363738393A3B3C3D3E3F404142434445464748494A4B4C4D4E4F505152535455565758595A5B5C5D5E5F606162636465666768696A6B6C6D6E6F707172737475767778797A7B7C7D7E7F808182838485868788898A8B8C8D8E8F909192939495969798999A9B9C9D9E9FA0A1A2A3A4A5A6A7A8A9AAABACADAEAFB0B1B2B3B4B5B6B7B8B9BABBBCBDBEBFC0C1C2C3C4C5C6C7C8C9CACBCCCDCECFD0D1D2D3D4D5D6D7D8D9DADBDCDDDEDFE0E1E2E3E4E5E6E7E8E9EAEBECEDEEEFF0F1F2F3F4F5F6F7F8F9FAFBFCFDFEFF","c":{"level":8.0,"c2":0.115,"c2h":0.0071875,"even":0.0016,"kClick":0.67,"kMax":0.65,"chop":0.3,"grav":0.05,"plop":0.1,"slamH":1.2,"slamV":0.17,"hMin":0.25,"hMax":15.7,"s0":6,"crownQ":44,"meniscus":2,"qMax":10},"dmpq":[1.0,0.99598,0.99197,0.98798,0.984,0.98004,0.9761,0.97217,0.96826,0.96436,0.96048],"ktdq":[1.0,0.92116,0.84853,0.78163,0.72,0.66323,0.61094,0.56277,0.5184,0.47753,0.43988,0.4052,0.37325,0.34382,0.31671,0.29174,0.26874,0.24755,0.22803,0.21005,0.19349],"spdq":[1.0,0.98465,0.96954,0.95465,0.94,0.92557,0.91136,0.89737,0.8836,0.87004,0.85668,0.84353,0.83058,0.81783,0.80528,0.79292,0.78075,0.76876,0.75696,0.74534,0.7339],"keq":[0.0,0.29289,0.5,0.64645,0.75,0.82322,0.875,0.91161,0.9375,0.95581,0.96875,0.9779,0.98438,0.98895,0.99219,0.99448,0.99609,0.99724,0.99805,0.99862,0.99902],"envc":[0.0,-0.0186,-0.0372,-0.0559,-0.0745,-0.2021,-0.3297,-0.4574,-0.585,-0.78,-0.975,-1.17,-1.365,-1.4926,-1.6203,-1.7479,-1.8755,-1.8941,-1.9128,-1.9314,-1.95,-1.9421,-1.9342,-1.9263,-1.9184,-1.8511,-1.7838,-1.7165,-1.6492,-1.4819,-1.3147,-1.1475,-0.9802,-0.7042,-0.4282,-0.1522,0.1238,0.4829,0.8419,1.201,1.56,1.95,2.34,2.73,3.12,3.479,3.8381,4.1971,4.5562,4.8322,5.1082,5.3842,5.6602,5.8275,5.9947,6.1619,6.3292,6.3965,6.4638,6.5311,6.5984,6.6063,6.6142,6.6221,6.63],"pipX":21,"pipRow":14,"ch":"abcdefghijklmnopqrstuv","foam":21,"tDrop":19,"tTail":10,"tPip":[20,8,11,7],"glass":[2238516,5530232],"S":[-0.032,-0.1875,0.2195,0.2195,-0.1875,-0.032],"sw1":[0.0,0.038,0.075,0.11,0.141,0.169,0.191,0.207,0.217,0.22,0.217,0.207,0.191,0.169,0.141,0.11,0.075,0.038,0.0,-0.038,-0.075,-0.11,-0.141,-0.169,-0.191,-0.207,-0.217,-0.22,-0.217,-0.207,-0.191,-0.169,-0.141,-0.11,-0.075,-0.038],"swp1":[0.0,0.075,0.141,0.191,0.217,0.217,0.191,0.141,0.075,0.0,-0.075,-0.141,-0.191,-0.217,-0.217,-0.191,-0.141,-0.075,-0.0,0.075,0.141,0.191,0.217,0.217,0.191,0.141,0.075,0.0,-0.075,-0.141,-0.191,-0.217,-0.217,-0.191,-0.141,-0.075],"swp2":[0.093,0.109,0.075,0.005,-0.067,-0.107,-0.098,-0.042,0.033,0.093,0.109,0.075,0.005,-0.067,-0.107,-0.098,-0.042,0.033,0.093,0.109,0.075,0.005,-0.067,-0.107,-0.098,-0.042,0.033,0.093,0.109,0.075,0.005,-0.067,-0.107,-0.098,-0.042,0.033],"cau":[["jjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjj","jjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjj","jjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjj","jjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjj","jjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjj","jjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjj","jjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjj","jjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjj","jjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjjlmljjjjjjjjjjlljjjjjjjjlmljjjjjjjjjjjlljjjjjjjjlmljjjjjjjj","iiikkiiiiiiiiiklkiiiiiiiiiikkiiiiiiiiklkiiiiiiiiiiikkiiiiiiiiklkiiiiiiiiiiikkiiiiiiiiiklkiiiiiiiiiikkiiiiiiiiklkiiiiiiiiiiikkiiiiiiiiklkiiiiiiii","hhhjjhhhhhhhhhjkjhhhhhhhhhhjjhhhhhhhhjkjhhhhhhhhhhhjjhhhhhhhhjkjhhhhhhhhhhhjjhhhhhhhhhjkjhhhhhhhhhhjjhhhhhhhhjkjhhhhhhhhhhhjjhhhhhhhhjkjhhhhhhhh","gggiigggggggggijiggggggggggiiggggggggijigggggggggggiiggggggggijigggggggggggiigggggggggijiggggggggggiiggggggggijigggggggggggiiggggggggijigggggggg","fffhhfffffffffhihffffffffffhhffffffffhihfffffffffffhhffffffffhihfffffffffffhhfffffffffhihffffffffffhhffffffffhihfffffffffffhhffffffffhihffffffff","eeeggeeeeeeeeeghgeeeeeeeeeeggeeeeeeeeghgeeeeeeeeeeeggeeeeeeeeghgeeeeeeeeeeeggeeeeeeeeeghgeeeeeeeeeeggeeeeeeeeghgeeeeeeeeeeeggeeeeeeeeghgeeeeeeee","dddffdddddddddfgfddddddddddffddddddddfgfdddddddddddffddddddddfgfdddddddddddffdddddddddfgfddddddddddffddddddddfgfdddddddddddffddddddddfgfdddddddd","ccceecccccccccefecccccccccceeccccccccefeccccccccccceeccccccccefeccccccccccceecccccccccefecccccccccceeccccccccefeccccccccccceeccccccccefecccccccc"],["jjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjj","jjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjj","jjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjj","jjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjj","jjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjj","jjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjj","jjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjj","jjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjj","jjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjjmnmjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjjjjjmmjjjjjjjjmnmjjjjjjjj","iiilliiiiiiiiilmliiiiiiiiiilliiiiiiiilmliiiiiiiiiiilliiiiiiiilmliiiiiiiiiiilliiiiiiiiilmliiiiiiiiiilliiiiiiiilmliiiiiiiiiiilliiiiiiiilmliiiiiiii","hhhkkhhhhhhhhhklkhhhhhhhhhhkkhhhhhhhhklkhhhhhhhhhhhkkhhhhhhhhklkhhhhhhhhhhhkkhhhhhhhhhklkhhhhhhhhhhkkhhhhhhhhklkhhhhhhhhhhhkkhhhhhhhhklkhhhhhhhh","gggjjgggggggggjkjggggggggggjjggggggggjkjgggggggggggjjggggggggjkjgggggggggggjjgggggggggjkjggggggggggjjggggggggjkjgggggggggggjjggggggggjkjgggggggg","fffiifffffffffijiffffffffffiiffffffffijifffffffffffiiffffffffijifffffffffffiifffffffffijiffffffffffiiffffffffijifffffffffffiiffffffffijiffffffff","eeehheeeeeeeeehiheeeeeeeeeehheeeeeeeehiheeeeeeeeeeehheeeeeeeehiheeeeeeeeeeehheeeeeeeeehiheeeeeeeeeehheeeeeeeehiheeeeeeeeeeehheeeeeeeehiheeeeeeee","dddggdddddddddghgddddddddddggddddddddghgdddddddddddggddddddddghgdddddddddddggdddddddddghgddddddddddggddddddddghgdddddddddddggddddddddghgdddddddd","cccffcccccccccfgfccccccccccffccccccccfgfcccccccccccffccccccccfgfcccccccccccffcccccccccfgfccccccccccffccccccccfgfcccccccccccffccccccccfgfcccccccc"]],"slant":[67,68,68,69,70,70,71,71,0,1,1,2,2,3,4,4],"air":["ayaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaza","yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaz","yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"],"cols":"lklkjjjjjihgfedconlkjjjjjihgfedcqnlkjjjjjihgfedcsnlkjjjjjihgfedctnlkjjjjjihgfedcunlkjjjjjihgfedcvnlkjjjjjihgfedcvslkjjjjjihgfedciklkjjjjjihgfedclnlkjjjjjihgfedcmnlkjjjjjihgfedcoolkjjjjjihgfedcoolkjjjjjihgfedcpolkjjjjjihgfedcqplkjjjjjihgfedcqslkjjjjjihgfedcgklkjjjjjihgfedchnlkjjjjjihgfedciolkjjjjjihgfedcjplkjjjjjihgfedckqlkjjjjjihgfedckqlkjjjjjihgfedclrlkjjjjjihgfedcltlkjjjjjihgfedcdklkjjjjjihgfedcenlkjjjjjihgfedceplkjjjjjihgfedcfqlkjjjjjihgfedcfrlkjjjjjihgfedcgslkjjjjjihgfedcgtlkjjjjjihgfedcgulkjjjjjihgfedcalklkjjjjihgfedcaonlkjjjjihgfedcaqnlkjjjjihgfedcasnlkjjjjihgfedcatnlkjjjjihgfedcaunlkjjjjihgfedcavnlkjjjjihgfedcavslkjjjjihgfedcaiklkjjjjihgfedcalnlkjjjjihgfedcamnlkjjjjihgfedcaoolkjjjjihgfedcaoolkjjjjihgfedcapolkjjjjihgfedcaqplkjjjjihgfedcaqslkjjjjihgfedcagklkjjjjihgfedcahnlkjjjjihgfedcaiolkjjjjihgfedcajplkjjjjihgfedcakqlkjjjjihgfedcakqlkjjjjihgfedcalrlkjjjjihgfedcaltlkjjjjihgfedcadklkjjjjihgfedcaenlkjjjjihgfedcaeplkjjjjihgfedcafqlkjjjjihgfedcafrlkjjjjihgfedcagslkjjjjihgfedcagtlkjjjjihgfedcagulkjjjjihgfedcaalklkjjjihgfedcaaonlkjjjihgfedcaaqnlkjjjihgfedcaasnlkjjjihgfedcaatnlkjjjihgfedcaaunlkjjjihgfedcaavnlkjjjihgfedcaavslkjjjihgfedcaaiklkjjjihgfedcaalnlkjjjihgfedcaamnlkjjjihgfedcaaoolkjjjihgfedcaaoolkjjjihgfedcaapolkjjjihgfedcaaqplkjjjihgfedcaaqslkjjjihgfedcaagklkjjjihgfedcaahnlkjjjihgfedcaaiolkjjjihgfedcaajplkjjjihgfedcaakqlkjjjihgfedcaakqlkjjjihgfedcaalrlkjjjihgfedcaaltlkjjjihgfedcaadklkjjjihgfedcaaenlkjjjihgfedcaaeplkjjjihgfedcaafqlkjjjihgfedcaafrlkjjjihgfedcaagslkjjjihgfedcaagtlkjjjihgfedcaagulkjjjihgfedcaaalklkjjihgfedcaaaonlkjjihgfedcaaaqnlkjjihgfedcaaasnlkjjihgfedcaaatnlkjjihgfedcaaaunlkjjihgfedcaaavnlkjjihgfedcaaavslkjjihgfedcaaaiklkjjihgfedcaaalnlkjjihgfedcaaamnlkjjihgfedcaaaoolkjjihgfedcaaaoolkjjihgfedcaaapolkjjihgfedcaaaqplkjjihgfedcaaaqslkjjihgfedcaaagklkjjihgfedcaaahnlkjjihgfedcaaaiolkjjihgfedcaaajplkjjihgfedcaaakqlkjjihgfedcaaakqlkjjihgfedcaaalrlkjjihgfedcaaaltlkjjihgfedcaaadklkjjihgfedcaaaenlkjjihgfedcaaaeplkjjihgfedcaaafqlkjjihgfedcaaafrlkjjihgfedcaaagslkjjihgfedcaaagtlkjjihgfedcaaagulkjjihgfedcaaaalklkjihgfedcaaaaonlkjihgfedcaaaaqnlkjihgfedcaaaasnlkjihgfedcaaaatnlkjihgfedcaaaaunlkjihgfedcaaaavnlkjihgfedcaaaavslkjihgfedcaaaaiklkjihgfedcaaaalnlkjihgfedcaaaamnlkjihgfedcaaaaoolkjihgfedcaaaaoolkjihgfedcaaaapolkjihgfedcaaaaqplkjihgfedcaaaaqslkjihgfedcaaaagklkjihgfedcaaaahnlkjihgfedcaaaaiolkjihgfedcaaaajplkjihgfedcaaaakqlkjihgfedcaaaakqlkjihgfedcaaaalrlkjihgfedcaaaaltlkjihgfedcaaaadklkjihgfedcaaaaenlkjihgfedcaaaaeplkjihgfedcaaaafqlkjihgfedcaaaafrlkjihgfedcaaaagslkjihgfedcaaaagtlkjihgfedcaaaagulkjihgfedcaaaaalklkihgfedcaaaaaonlkihgfedcaaaaaqnlkihgfedcaaaaasnlkihgfedcaaaaatnlkihgfedcaaaaaunlkihgfedcaaaaavnlkihgfedcaaaaavslkihgfedcaaaaaiklkihgfedcaaaaalnlkihgfedcaaaaamnlkihgfedcaaaaaoolkihgfedcaaaaaoolkihgfedcaaaaapolkihgfedcaaaaaqplkihgfedcaaaaaqslkihgfedcaaaaagklkihgfedcaaaaahnlkihgfedcaaaaaiolkihgfedcaaaaajplkihgfedcaaaaakqlkihgfedcaaaaakqlkihgfedcaaaaalrlkihgfedcaaaaaltlkihgfedcaaaaadklkihgfedcaaaaaenlkihgfedcaaaaaeplkihgfedcaaaaafqlkihgfedcaaaaafrlkihgfedcaaaaagslkihgfedcaaaaagtlkihgfedcaaaaagulkihgfedcaaaaaalkljhgfedcaaaaaaonljhgfedcaaaaaaqnljhgfedcaaaaaasnljhgfedcaaaaaatnljhgfedcaaaaaaunljhgfedcaaaaaavnljhgfedcaaaaaavsljhgfedcaaaaaaikljhgfedcaaaaaalnljhgfedcaaaaaamnljhgfedcaaaaaaooljhgfedcaaaaaaooljhgfedcaaaaaapoljhgfedcaaaaaaqpljhgfedcaaaaaaqsljhgfedcaaaaaagkljhgfedcaaaaaahnljhgfedcaaaaaaioljhgfedcaaaaaajpljhgfedcaaaaaakqljhgfedcaaaaaakqljhgfedcaaaaaalrljhgfedcaaaaaaltljhgfedcaaaaaadkljhgfedcaaaaaaenljhgfedcaaaaaaepljhgfedcaaaaaafqljhgfedcaaaaaafrljhgfedcaaaaaagsljhgfedcaaaaaagtljhgfedcaaaaaaguljhgfedcaaaaaaalkkigfedcaaaaaaaonkigfedcaaaaaaaqnkigfedcaaaaaaasnkigfedcaaaaaaatnkigfedcaaaaaaaunkigfedcaaaaaaavnkigfedcaaaaaaavskigfedcaaaaaaaikkigfedcaaaaaaalnkigfedcaaaaaaamnkigfedcaaaaaaaookigfedcaaaaaaaookigfedcaaaaaaapokigfedcaaaaaaaqpkigfedcaaaaaaaqskigfedcaaaaaaagkkigfedcaaaaaaahnkigfedcaaaaaaaiokigfedcaaaaaaajpkigfedcaaaaaaakqkigfedcaaaaaaakqkigfedcaaaaaaalrkigfedcaaaaaaaltkigfedcaaaaaaadkkigfedcaaaaaaaenkigfedcaaaaaaaepkigfedcaaaaaaafqkigfedcaaaaaaafrkigfedcaaaaaaagskigfedcaaaaaaagtkigfedcaaaaaaagukigfedcaaaaaaaaljjhfedcaaaaaaaaomjhfedcaaaaaaaaqmjhfedcaaaaaaaasmjhfedcaaaaaaaatmjhfedcaaaaaaaaumjhfedcaaaaaaaavmjhfedcaaaaaaaavrjhfedcaaaaaaaaijjhfedcaaaaaaaalmjhfedcaaaaaaaamnjhfedcaaaaaaaaonjhfedcaaaaaaaaonjhfedcaaaaaaaapojhfedcaaaaaaaaqojhfedcaaaaaaaaqsjhfedcaaaaaaaagkjhfedcaaaaaaaahnjhfedcaaaaaaaaiojhfedcaaaaaaaajpjhfedcaaaaaaaakpjhfedcaaaaaaaakqjhfedcaaaaaaaalqjhfedcaaaaaaaaltjhfedcaaaaaaaadkjhfedcaaaaaaaaenjhfedcaaaaaaaaepjhfedcaaaaaaaafqjhfedcaaaaaaaafrjhfedcaaaaaaaagsjhfedcaaaaaaaagsjhfedcaaaaaaaagujhfedcaaaaaaaaaliigedcaaaaaaaaaoligedcaaaaaaaaaqligedcaaaaaaaaasligedcaaaaaaaaatligedcaaaaaaaaauligedcaaaaaaaaavligedcaaaaaaaaavqigedcaaaaaaaaaiiigedcaaaaaaaaalligedcaaaaaaaaammigedcaaaaaaaaaomigedcaaaaaaaaaonigedcaaaaaaaaapnigedcaaaaaaaaaqnigedcaaaaaaaaaqrigedcaaaaaaaaagjigedcaaaaaaaaahmigedcaaaaaaaaainigedcaaaaaaaaajoigedcaaaaaaaaakpigedcaaaaaaaaakpigedcaaaaaaaaalqigedcaaaaaaaaalsigedcaaaaaaaaadkigedcaaaaaaaaaenigedcaaaaaaaaaeoigedcaaaaaaaaafqigedcaaaaaaaaafrigedcaaaaaaaaagrigedcaaaaaaaaagsigedcaaaaaaaaagtigedcaaaaaaaaaalhhfdcaaaaaaaaaaokhfdcaaaaaaaaaaqkhfdcaaaaaaaaaaskhfdcaaaaaaaaaatkhfdcaaaaaaaaaaukhfdcaaaaaaaaaavkhfdcaaaaaaaaaavphfdcaaaaaaaaaaiihfdcaaaaaaaaaallhfdcaaaaaaaaaamlhfdcaaaaaaaaaaomhfdcaaaaaaaaaaomhfdcaaaaaaaaaapmhfdcaaaaaaaaaaqmhfdcaaaaaaaaaaqqhfdcaaaaaaaaaagjhfdcaaaaaaaaaahmhfdcaaaaaaaaaainhfdcaaaaaaaaaajohfdcaaaaaaaaaakohfdcaaaaaaaaaakphfdcaaaaaaaaaalphfdcaaaaaaaaaalshfdcaaaaaaaaaadkhfdcaaaaaaaaaaenhfdcaaaaaaaaaaeohfdcaaaaaaaaaafqhfdcaaaaaaaaaafqhfdcaaaaaaaaaagrhfdcaaaaaaaaaagshfdcaaaaaaaaaagthfdcaaaaaaaaaaalggecaaaaaaaaaaaojgecaaaaaaaaaaaqjgecaaaaaaaaaaasjgecaaaaaaaaaaatjgecaaaaaaaaaaaujgecaaaaaaaaaaavjgecaaaaaaaaaaavogecaaaaaaaaaaaihgecaaaaaaaaaaalkgecaaaaaaaaaaamkgecaaaaaaaaaaaolgecaaaaaaaaaaaolgecaaaaaaaaaaaplgecaaaaaaaaaaaqmgecaaaaaaaaaaaqpgecaaaaaaaaaaagigecaaaaaaaaaaahlgecaaaaaaaaaaaimgecaaaaaaaaaaajngecaaaaaaaaaaakogecaaaaaaaaaaakogecaaaaaaaaaaalpgecaaaaaaaaaaalrgecaaaaaaaaaaadjgecaaaaaaaaaaaemgecaaaaaaaaaaaeogecaaaaaaaaaaafpgecaaaaaaaaaaafqgecaaaaaaaaaaagrgecaaaaaaaaaaagsgecaaaaaaaaaaagtgecaaaaaaaaaaaalffdaaaaaaaaaaaaoifdaaaaaaaaaaaaqifdaaaaaaaaaaaasifdaaaaaaaaaaaatifdaaaaaaaaaaaauifdaaaaaaaaaaaavifdaaaaaaaaaaaavnfdaaaaaaaaaaaaigfdaaaaaaaaaaaaljfdaaaaaaaaaaaamkfdaaaaaaaaaaaaokfdaaaaaaaaaaaaokfdaaaaaaaaaaaaplfdaaaaaaaaaaaaqlfdaaaaaaaaaaaaqpfdaaaaaaaaaaaagifdaaaaaaaaaaaahlfdaaaaaaaaaaaaimfdaaaaaaaaaaaajnfdaaaaaaaaaaaaknfdaaaaaaaaaaaakofdaaaaaaaaaaaalofdaaaaaaaaaaaalrfdaaaaaaaaaaaadjfdaaaaaaaaaaaaemfdaaaaaaaaaaaaeofdaaaaaaaaaaaafpfdaaaaaaaaaaaafqfdaaaaaaaaaaaagrfdaaaaaaaaaaaagrfdaaaaaaaaaaaagtfdaaaaaaaaaaaaaleeaaaaaaaaaaaaaoheaaaaaaaaaaaaaqheaaaaaaaaaaaaasheaaaaaaaaaaaaatheaaaaaaaaaaaaauheaaaaaaaaaaaaavheaaaaaaaaaaaaavmeaaaaaaaaaaaaaifeaaaaaaaaaaaaalieaaaaaaaaaaaaamjeaaaaaaaaaaaaaojeaaaaaaaaaaaaaokeaaaaaaaaaaaaapkeaaaaaaaaaaaaaqkeaaaaaaaaaaaaaqoeaaaaaaaaaaaaagheaaaaaaaaaaaaahkeaaaaaaaaaaaaaileaaaaaaaaaaaaajmeaaaaaaaaaaaaakneaaaaaaaaaaaaakneaaaaaaaaaaaaaloeaaaaaaaaaaaaalqeaaaaaaaaaaaaadjeaaaaaaaaaaaaaemeaaaaaaaaaaaaaeneaaaaaaaaaaaaafpeaaaaaaaaaaaaafqeaaaaaaaaaaaaagqeaaaaaaaaaaaaagreaaaaaaaaaaaaagseaaaaaaaaaaaaaaldaaaaaaaaaaaaaaogaaaaaaaaaaaaaaqgaaaaaaaaaaaaaasgaaaaaaaaaaaaaatgaaaaaaaaaaaaaaugaaaaaaaaaaaaaavgaaaaaaaaaaaaaavlaaaaaaaaaaaaaaifaaaaaaaaaaaaaaliaaaaaaaaaaaaaamiaaaaaaaaaaaaaaojaaaaaaaaaaaaaaojaaaaaaaaaaaaaapjaaaaaaaaaaaaaaqjaaaaaaaaaaaaaaqnaaaaaaaaaaaaaaghaaaaaaaaaaaaaahkaaaaaaaaaaaaaailaaaaaaaaaaaaaajmaaaaaaaaaaaaaakmaaaaaaaaaaaaaaknaaaaaaaaaaaaaalnaaaaaaaaaaaaaalqaaaaaaaaaaaaaadjaaaaaaaaaaaaaaemaaaaaaaaaaaaaaenaaaaaaaaaaaaaafpaaaaaaaaaaaaaafpaaaaaaaaaaaaaagqaaaaaaaaaaaaaagraaaaaaaaaaaaaagsaaaaaaaaaaaaaaalaaaaaaaaaaaaaaaoaaaaaaaaaaaaaaaqaaaaaaaaaaaaaaasaaaaaaaaaaaaaaataaaaaaaaaaaaaaauaaaaaaaaaaaaaaavaaaaaaaaaaaaaaavaaaaaaaaaaaaaaaiaaaaaaaaaaaaaaalaaaaaaaaaaaaaaamaaaaaaaaaaaaaaaoaaaaaaaaaaaaaaaoaaaaaaaaaaaaaaapaaaaaaaaaaaaaaaqaaaaaaaaaaaaaaaqaaaaaaaaaaaaaaagaaaaaaaaaaaaaaahaaaaaaaaaaaaaaaiaaaaaaaaaaaaaaajaaaaaaaaaaaaaaakaaaaaaaaaaaaaaakaaaaaaaaaaaaaaalaaaaaaaaaaaaaaalaaaaaaaaaaaaaaadaaaaaaaaaaaaaaaeaaaaaaaaaaaaaaaeaaaaaaaaaaaaaaafaaaaaaaaaaaaaaafaaaaaaaaaaaaaaagaaaaaaaaaaaaaaagaaaaaaaaaaaaaaagaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","cls":[7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,3,3,3,3,3,3,3,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7],"body":[9,9,9,9,9,9,9,9,9,8,7,6,5,4,3,2],"book":[[[3,"N...N.NNN....X"],[2,"NN..N..N......XX"],[3,"N..N..NN.....X"],[3,"N.N.....N"],[3,"N.N...NN"],0,[17,"dddaaa....ab....bb....cccccd..dd....aa"],[17,"da....aa..bb....bc..cc........dd....aa"],[17,"ee....ef..ff....gg..gg........he....ee"],[17,"eeeeef....ff....gg....hhhh....eeeeeeef"],[17,"mm........no....oo........pm..mm....nn"],[17,"mn........oo....op........mm..mm....nn"],[17,"rr..........ssst....tttqqq....qr....rr"],0,0,0],[[2,"NN....N.NNN...X........................................h.......e"],[4,"N..N..N.....XX......................................dlptttqqmia"],[3,"N...N..NN....X........................................h.......e"],[2,"N...N.....N"],[2,"NNN.N...NN"],0,[41,"cccddd..dd..aa......bbbbbb"],[43,"dd....da..aa........bb"],[43,"hh....ee..ee........fg"],[43,"hh....ee..ef........gg"],[43,"pm....mm..nn........oo"],[43,"mm....mn..nn........oo"],[43,"qq....rr..rrrsss....st"],0,0,0],[[2,"NN....N.NNN...X"],[4,"N..N..N.....XX"],[3,"N...N..NN....X"],[4,"N.N.....N"],[2,"NN..N...NN"],0,[16,"d.d.a..aa..abb.bbbb.ccc......dddd.d....aa...bb..bbb"],[16,"d.a.a.a..a..b..b....c..c..d..d....a...a..a.b..b..b"],[16,"e.e.e.e..f..f..f....g..g..h..h....e...e..f.f..f..g"],[16,"e.e.e.ffff..f..ggg..ggh..hhh.hee..e...f..f.fffg..g"],[17,"m.m..n..n..o..o....p..p..p..m....m...n..n.n..o..o"],[17,"m.n..n..n..o..o....p..p..m..m....n...n..n.o..o..o"],[17,"r.r..r..s..s..sttt.t..t.....q....rrr..rs..s..s..t"],0,0,[28,"GG....HH"]],[[4,"N...N.NNN...X"],[3,"NN..N..N.....XX"],[2,"N.N..N..NN....X"],[2,"NNN.N.....N"],[4,"N.N...NN"],0,[7,"c.....................bbbbbbbc..cc..cd..dd..daaaaa"],[6,"cg.....................bb........cc..dd..dd....aa"],[5,"cgkllllll...............ff........gh..hh..he....ee"],[4,"gkpppppppp...............fggggg......hh....ee....ef"],[5,"pttttttqq...............oo........pp..pm..mm....nn"],[6,"tt.....................oo........pp..mm..mm....nn"],[7,"t.....................sssttttt..tq..qq..qr....rr"],0,0,0],[[2,"NNN...N.NNN...X.....ccdddddd.da....aa.....bb...cccc...dd..dd.da"],[2,"N....N..N.....XX....dd.......aaaa..ab.....bb.cc....cd.dd..dd.aa"],[2,"NN...N..NN....X.....hh.......eeee..ff.....gg.gg....hh.hh..ee.ee"],[4,"N.N.....N.........hhhhee...ee..ffff.....gg.gg....hh...ee...ee"],[2,"NN..N...NN..........pp.......mn....nn.oo..oo.op....pp...mm"],[22,"mm.......nn....no.oo..oo.pp....pm...mm"],[22,"qqqqqqrr.rr....ss...ss.....tttq.....qq...rr"],0,0,[0,"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"],[0,"yyyyyyydddyyaaayyaaabyybbbyycccyyyyyddyydyydyayayyyybyybybbbcycycyyyyyyy"],[0,"yyyyyyydyyayayyayayyyybyyyycyyyyyyydyydyddyayayayyyybybyybyyyycycyyyyyyy"],[4,"yyydaayyaaayybbbyyybcyyyccyyyyyddddyayaayyayyyyybbyyycccyyycyyyy"],[4,"yyyayyyyayybybyyyyyyycyyyydyyyydyyayayyayybyyyyybycyycyyyyydyyyy"],[4,"yyyayyyybyybybbbcycccyycddyyyyydyyayayyayybyyyyycyycycccdyydyyyy"],[4,"zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"]],[[4,"aaa.b....bb...ccc.c..d"],[4,"aab.b....bc...ccc.d..d"],[3,"e....f...g..g.g....h..h"],[3,"f....f...g..g.g....h..h"],[4,"jj..k...k..k..ll..llii"],[6,"o.o...o..p....p.m..m"],[6,"o.o...p..p....m.m..m........................NNN.N..N.N.NNN..NNNN"],[3,"sss..sst..tt..tqq..q..q.......................N....N..N.N.N..N.N"],[3,"sss..ttt..tt..qqq..q..r.......................N.NN.N..N.N.N..N.NNN"],[49,"N..N.N..N.N.N..N.N"],[50,"NNN..NN..N.NNN..NNNN"],0,0,0,0,0]],"bookLevels":[21,20,19,18,16],"bookFixed":[["N",14],["X",18],["x",5],["y",3],["z",2]],"bookDots":[5697216,16480676],"bookGlow":[[96,40],[176,84]],"bookStep":420,"guideLevel":[1.2,1.2,1.2,0.5,7.5],"guideTop":[2.0,4.2,2.0,2.0,8.0],"guideLean":0.32,"guideTouch":0.03,"guideTap":[0.4,0.3],"guideDuckX":7.5,"titleLevel":4.0,"titleMs":4000,"press":[["#####",".###.","..#..",".....","ggggg"],[".....","#####",".###.","..#..","ggggg"]],"pressX":59,"pressMs":[500,300],"pressTone":[20,14],"drop":["..00..",".1221.","433334"],"startX":33,"startMs":[500,300],"gl":"yyyaaaaaaaaaaaaa","gr":"zzyyyaaaaaaaaaaa","glassRows":5,"glassX":[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],"corner":["....","b...","c...","ade."],"cornerR":["....","...b","...c",".eda"],"cornerMix":[[1,180],[2,40],[3,40],[3,180]],"cornerKeys":"bcdefghijklmnopq","cornerGlass":[5267064,7768228],"toyDefault":"duck","toys":{"duck":{"w":9,"h":11,"wl":7,"spr":[".........\\n.........\\nh........\\ny....hhh.\\ndhh.yyye.\\n.yyyyyyoo\\n.dyyyyyy.\\n.__YYYYD.\\n...___D_.\\n......_..\\n.........",".........\\n.........\\n......h..\\nh....hyh.\\nyh..yyyeo\\ndyhyyyyo.\\n.dyyyyyy.\\n._YYYYDD.\\n..______.\\n.........\\n.........",".........\\n.........\\n......hh.\\n.....hyeo\\nh...yyyo.\\nyhhyyyyy.\\ndyyyyyyd.\\n_DYYYYD_.\\n.______..\\n.........\\n.........",".........\\n.......h.\\n......heo\\n.....hyo.\\n....yyyy.\\nh.hyyyyd.\\nyhyyyyy..\\nDYYYYYD..\\n_D_____..\\n._.......\\n.........",".........\\n......hho\\n......ye.\\n.....hyo.\\n....yyyy.\\n...yyyyd.\\nhhhyyyd..\\nYYYYYY_..\\nDDY___...\\n___......\\n.........",".........\\nohh......\\n.ey......\\n.oyh.....\\n.yyyy....\\n.dyyyy...\\n..dyyyhhh\\n.._YYYYYY\\n...___YDD\\n......___\\n.........",".........\\n.h.......\\noeh......\\n.oyh.....\\n.yyyy....\\n.dyyyyh.h\\n..yyyyyhy\\n..DYYYYYD\\n.._____D_\\n......._.\\n.........",".........\\n.........\\n.hh......\\noeyh.....\\n.oyyy...h\\n.yyyyyhhy\\n.dyyyyyyd\\n._DYYYYD_\\n..______.\\n.........\\n.........",".........\\n.........\\n..h......\\n.hyh....h\\noeyyy..hy\\n.oyyyyhyd\\n.yyyyyyd.\\n.DDYYYY_.\\n.______..\\n.........\\n.........",".........\\n.........\\n........h\\n.hhh....y\\n.eyyy.hhd\\nooyyyyyy.\\n.yyyyyyd.\\n.DYYYY__.\\n._D___...\\n.._......\\n........."],"keys":"dehoy","ink":[14715392,3810304,16773258,16743196,16762910],"faces":2,"frames":1,"roll":0,"blink":0,"move":[0.22,0.8,0.93,0.45,1.2,1.0],"under":1,"above":5},"boat":{"w":9,"h":12,"wl":8,"spr":[".........\\n.........\\n....m....\\n....mw...\\nh.jjmw...\\n.hhjmww..\\n.rrhhhwv.\\n..krrrhh.\\n.._KKKRKR\\n...___K__\\n......_..\\n.........",".........\\n.........\\n....m....\\n....mw...\\n...jmww..\\nhhjjmww..\\n.rhhhhhv.\\n..rrrrrhr\\n..KKKKKK_\\n..______.\\n.........\\n.........",".........\\n.........\\n....m....\\n....mw...\\n...jmww..\\n..jjmwwv.\\nhhhhhhhhr\\n.rrrrrrk.\\n._KKKKK_.\\n.._____..\\n.........\\n.........",".........\\n.........\\n....m....\\n....mw...\\n...jmwwv.\\n..jjmwwhr\\n..hhhhhk.\\nhhrrrrr..\\n_RKKKKK..\\n.______..\\n.........\\n.........",".........\\n.........\\n....m....\\n....mww..\\n...jmwwvr\\n...jmwhh.\\n..jhhhrk.\\n.hhrrrk..\\nHRRKKK_..\\n__K___...\\n.._......\\n.........",".........\\n.........\\n....m....\\n..wwm....\\nrvwwmj...\\n.hhwmj...\\n.krhhhj..\\n..krrrhh.\\n.._KKKRRH\\n...___K__\\n......_..\\n.........",".........\\n.........\\n....m....\\n...wm....\\n.vwwmj...\\nrhwwmjj..\\n.khhhhh..\\n..rrrrrhh\\n..KKKKKR_\\n..______.\\n.........\\n.........",".........\\n.........\\n....m....\\n...wm....\\n..wwmj...\\n.vwwmjj..\\nrhhhhhhhh\\n.krrrrrr.\\n._KKKKK_.\\n.._____..\\n.........\\n.........",".........\\n.........\\n....m....\\n...wm....\\n..wwmj...\\n..wwmjjhh\\n.vhhhhhr.\\nrhrrrrr..\\n_KKKKKK..\\n.______..\\n.........\\n.........",".........\\n.........\\n....m....\\n...wm....\\n...wmjj.h\\n..wwmjhh.\\n.vwhhhrr.\\n.hhrrrk..\\nRKRKKK_..\\n__K___...\\n.._......\\n........."],"keys":"hjkmrvw","ink":[16019540,14608630,9314842,9859146,13909550,11584738,16777215],"faces":2,"frames":1,"roll":0,"blink":0,"move":[0.18,0.78,0.945,0.35,1.6,0.8],"under":1,"above":6},"paper":{"w":9,"h":11,"wl":7,"spr":[".........\\n.........\\nw...w....\\nw.wwwg...\\n.wwwwg...\\n.wwwwwg..\\n..gwwwwgw\\n.._GXXGGG\\n...___X__\\n......_..\\n.........",".........\\n.........\\n....w....\\nw..wwg...\\nwwwwwgg..\\n.wwwwww.w\\n..wwwwggg\\n..GGXXXG_\\n..______.\\n.........\\n.........",".........\\n.........\\n....w....\\n...wwg...\\nw.wwwgg.w\\nwwwwwwwgg\\n.wwwwwgg.\\n._GGXXX_.\\n.._____..\\n.........\\n.........",".........\\n.........\\n....w....\\n...wwg..w\\n..wwwgggg\\nw.wwwwwg.\\nwwwwwwg..\\n_WGGXXX..\\n.______..\\n.........\\n.........",".........\\n.........\\n....w...w\\n...wwgg.g\\n...wwgwg.\\n..wwwwgg.\\nwwwwwwx..\\nWWWGXX_..\\n__G___...\\n.._......\\n........."],"keys":"gwx","ink":[13160670,16777215,9608368],"faces":1,"frames":1,"roll":0,"blink":0,"move":[0.24,0.84,0.935,0.3,1.6,1.2],"under":1,"above":5},"bottle":{"w":11,"h":9,"wl":4,"spr":["...........\\n..hh.......\\n.gpphhh....\\n.gppppg....\\n._KKPPGNNC.\\n..__KKKG__.\\n....____...\\n...........\\n...........","...........\\n...........\\n.ghhhhh....\\n.gppppgnn..\\n._PPPPGG_C.\\n..KKKKK_._.\\n.._____....\\n...........\\n...........","...........\\n...........\\n..hhhhh....\\n.gppppgnnc.\\n.GPPPPGG__.\\n._KKKKK_...\\n.._____....\\n...........\\n...........","...........\\n...........\\n..hhhhh..c.\\n..ppppgnn..\\n.GPPPPGG_..\\n.GKKKKK_...\\n.______....\\n...........\\n...........","...........\\n...........\\n....hhhnnc.\\n..hhppgg...\\n.GPPPPG_...\\n.GPPKKK....\\n._KK___....\\n..__.......\\n...........","...........\\n..hh.......\\n.ggghhh....\\n.gppggg....\\n._KPPPGNNC.\\n..__PKKG__.\\n....____...\\n...........\\n...........","...........\\n...........\\n.ghhhhh....\\n.ggggggnn..\\n._PPPPGG_C.\\n..KPPKK_._.\\n.._____....\\n...........\\n...........","...........\\n...........\\n..hhhhh....\\n.ggggggnnc.\\n.GPPPPGG__.\\n._KPPKK_...\\n.._____....\\n...........\\n...........","...........\\n...........\\n..hhhhh..c.\\n..gggggnn..\\n.GPPPPGG_..\\n.GKPPKK_...\\n.______....\\n...........\\n...........","...........\\n...........\\n....hhhnnc.\\n..hhgggg...\\n.GGGPPG_...\\n.GPPPKK....\\n._KP___....\\n..__.......\\n...........","...........\\n...........\\n.cnnhhh....\\n...ggpphh..\\n..._GPPPPG.\\n....KKKPPG.\\n....___KK_.\\n.......__..\\n...........","...........\\n...........\\n.c..hhhhh..\\n..nngpppp..\\n.._GGPPPPG.\\n..._KKKKKG.\\n....______.\\n...........\\n...........","...........\\n...........\\n....hhhhh..\\n.cnngppppg.\\n.__GGPPPPG.\\n..._KKKKK_.\\n...._____..\\n...........\\n...........","...........\\n...........\\n....hhhhhg.\\n..nngppppg.\\n.C_GGPPPP_.\\n._._KKKKK..\\n...._____..\\n...........\\n...........","...........\\n.......hh..\\n....hhhppg.\\n....gppppg.\\n.CNNGPPKK_.\\n.__GKKK__..\\n...____....\\n...........\\n...........","...........\\n...........\\n.cnnhhh....\\n...gggghh..\\n..._GPPGGG.\\n....KKPPPG.\\n....___PK_.\\n.......__..\\n...........","...........\\n...........\\n.c..hhhhh..\\n..nnggggg..\\n.._GGPPPPG.\\n..._KKPPKG.\\n....______.\\n...........\\n...........","...........\\n...........\\n....hhhhh..\\n.cnngggggg.\\n.__GGPPPPG.\\n..._KKPPK_.\\n...._____..\\n...........\\n...........","...........\\n...........\\n....hhhhhg.\\n..nngggggg.\\n.C_GGPPPP_.\\n._._KKPPK..\\n...._____..\\n...........\\n...........","...........\\n.......hh..\\n....hhhggg.\\n....gggppg.\\n.CNNGPPPK_.\\n.__GKKP__..\\n...____....\\n...........\\n..........."],"keys":"cghknp","ink":[11828290,4371064,12515542,1997390,6080652,16181958],"faces":2,"frames":2,"roll":5,"blink":0,"move":[0.16,0.74,0.95,0.4,0.6,0.7],"under":2,"above":2},"ball":{"w":7,"h":12,"wl":7,"spr":[".......\\n.......\\nwbbrr..\\nwbbri..\\nvbbrrr.\\n.bbrri.\\n.cbrrrw\\n._BRRRW\\n..CRRRW\\n.._____\\n.......\\n.......",".......\\n.......\\n.bbrr..\\nwbbri..\\nwbbrrr.\\nvbbrriw\\n.cbrrrw\\n._BRRRW\\n..CRRR_\\n..____.\\n.......\\n.......",".......\\n.......\\n..brr..\\n.bbrir.\\nwbbrriw\\nwbbrrrw\\nvbbrrrw\\n_CBRRR_\\n._CRR_.\\n..___..\\n.......\\n.......",".......\\n.......\\n..brrr.\\n..briiw\\n.bbrrrw\\nwbbrrrw\\nwbbrrr.\\nVBBRR_.\\n_CCRR..\\n.____..\\n.......\\n.......",".......\\n.......\\n..brrrw\\n..briiw\\n.bbrrrw\\n.bbrrr.\\nwbbrrr.\\nWBBRR_.\\nVCCRR..\\n_____..\\n.......\\n.......",".......\\n.......\\nbbbrw..\\nbbrri..\\ncbrrrw.\\n.brrri.\\n.crrrww\\n._RRRWW\\n..CRWWW\\n.._____\\n.......\\n.......",".......\\n.......\\n.bbrw..\\nbbrri..\\nbbrrrw.\\ncbrrriw\\n.crrrww\\n._RRRWW\\n..CRWW_\\n..____.\\n.......\\n.......",".......\\n.......\\n..brw..\\n.brriw.\\nbbrrriw\\nbbrrrww\\ncbrrrww\\n_CRRRW_\\n._CRW_.\\n..___..\\n.......\\n.......",".......\\n.......\\n..brww.\\n..rriiw\\n.brrrww\\nbbrrrww\\nbbrrrw.\\nCBRRR_.\\n_CCRW..\\n.____..\\n.......\\n.......",".......\\n.......\\n..brwww\\n..rriiw\\n.brrrww\\n.brrrw.\\nbbrrrw.\\nBBRRR_.\\nCCCRW..\\n_____..\\n.......\\n......."],"keys":"bcirsvw","ink":[3181823,1857726,16777215,16731196,11544608,12897498,16777215],"faces":1,"frames":2,"roll":3,"blink":0,"move":[0.3,0.9,0.96,0.75,0.0,1.7],"under":2,"above":5},"ice":{"w":7,"h":10,"wl":4,"spr":[".......\\nhh.....\\nlwhhh..\\nlwwiwh.\\n_WWWWW.\\n.LWWWWL\\n._LLLWL\\n..___LL\\n.....__\\n.......",".......\\n.h.....\\nhwhhh..\\nlwwiwh.\\nLWWWWWL\\n_LWWWWL\\n._LLLWL\\n..___L_\\n....._.\\n.......",".......\\n.......\\n.hhhhh.\\nhwwiwwl\\nLWWWWWL\\nLWWWWWL\\n_LLLLL_\\n._____.\\n.......\\n.......",".......\\n.....h.\\n..hhhwl\\n.hwiwwl\\nHWWWWWL\\nLWWWWL_\\nLWLLL_.\\n_L___..\\n._.....\\n.......",".......\\n.....hl\\n..hhhwl\\n.hwiwwl\\n.WWWWW_\\nHWWWWL.\\nLWLLL_.\\nLL___..\\n__.....\\n......."],"keys":"hilw","ink":[16777215,16777215,10275056,14611199],"faces":1,"frames":1,"roll":0,"blink":0,"move":[0.1,0.7,0.9,0.2,0.7,0.45],"under":3,"above":2},"buoy":{"w":7,"h":13,"wl":8,"spr":[".......\\n.......\\n..uLu..\\n...m...\\n..hrk..\\n.hwww..\\n.hrrr..\\n.rrrrk.\\n._RRKK.\\n..KKKK.\\n..____.\\n.......\\n.......",".......\\n.......\\n..uLu..\\n...m...\\n..hrk..\\n.hwww..\\n.hrrr..\\n.rrrrk.\\n._RRKK.\\n..KKKK.\\n..____.\\n.......\\n.......",".......\\n.......\\n..uLu..\\n...m...\\n..hrk..\\n..www..\\n.hrrrk.\\n.hrrrk.\\n.RRRKK.\\n._KKK_.\\n..___..\\n.......\\n.......",".......\\n.......\\n..uLu..\\n...m...\\n..hrk..\\n..wwwk.\\n..rrrk.\\n.hrrrk.\\n.HRRK_.\\n.RKKK..\\n.____..\\n.......\\n.......",".......\\n.......\\n..uLu..\\n...m...\\n..hrk..\\n..wwwk.\\n..rrrk.\\n.hrrrk.\\n.HRRK_.\\n.RKKK..\\n.____..\\n.......\\n......."],"keys":"Lhkmruw","ink":[16769626,16742496,9838618,11055294,14826028,9858580,16448250],"faces":1,"frames":1,"roll":0,"blink":900,"move":[0.2,0.86,0.9,0.3,0.5,0.9],"under":2,"above":6}},"toyX":22.0,"padT":2,"tShadow":3,"tUnder":9,"gravT":0.045,"push":0.16,"land":0.22,"home":0.0003,"toyNames":["none","duck","boat","paper","bottle","ball","ice","buoy"],"toyWords":["NONE","DUCK","SAILBOAT","PAPER","BOTTLE","BALL","ICE CUBE","BUOY"],"floatX":63.0,"dot":9871538,"marks":["1/2","2/2"],"freshWord":"FRESH WATER"},"x":{"CLEAR":25,"DEEP SEA":18,"MINT":28,"ROSE":27,"WHISKY":23,"INK":31,"MERCURY":19,"RAINBOW":20,"NONE":27,"DUCK":27,"SAILBOAT":19,"PAPER":24,"BOTTLE":23,"BALL":28,"ICE CUBE":20,"BUOY":27,"FRESH WATER":11}};
// ===== core.js =====
const APP = D.app;
const API = "http://localhost/api/";
const T = 20, STILL = 120;
let stopped = false;
const sleep = (ms) => new Promise((done) => setTimeout(done, Math.max(0, ms)));
const ctl = { turn: 0, start: 0, ok: 0 };
let onBack = null;
let wake = null;
function nap(ms) {
return new Promise((done) => {
const timer = setTimeout(() => {
wake = null;
done();
}, Math.max(0, ms));
wake = () => {
clearTimeout(timer);
wake = null;
done();
};
});
}
function report(what, err) {
console.error(APP + ": " + what + ": " + (err && err.message ? err.message : String(err)));
}
async function call(method, path, body, type) {
try {
const init = body === undefined ? { method: method }
: { method: method, headers: { "Content-Type": type || "application/json" }, body: body };
if (D.lag && path === "display/draw") await sleep(80 + Math.random() * 70);
const res = await fetch(API + path, init);
const text = await res.text();
return { ok: res.ok, status: res.status, text: text };
} catch (err) {
return { ok: false, status: 0, text: String(err) };
}
}
const errs = { draw: 0, saved: "" };
function saveErrs() {
const line = "draw " + errs.draw;
if (line === errs.saved) return;
errs.saved = line;
call("POST", "storage/write?path=/ext/data/errors.txt", line, "application/octet-stream");
}
async function loadSettings() {
const got = await call("GET", "apps/settings?app_id=" + APP);
try {
return (got.ok && JSON.parse(got.text).values) || {};
} catch (err) {
return {};
}
}
const unbind = listen("input", (event) => {
if (stopped) return;
if (event.key === "back") {
if (event.action !== "short") return;
if (!(onBack && onBack())) {
stopped = true;
setTimeout(unbind, 10);
}
} else if (event.key === "encoder") {
ctl.turn += event.delta > 0 ? 1 : event.delta < 0 ? -1 : 0;
} else if (event.action === "short" && event.key === "ok") {
ctl.ok++;
} else if (event.action === "short" && event.key === "start") {
ctl.start++;
} else {
return;
}
if (wake) wake();
});
// ===== water.js =====
const K = D.w, C = K.c;
const NP = 18, LASTP = NP - 1, NC = 36, LAST = NC - 1;
const TEST = !!(D.fresh || D.demo || D.fps || D.calmMs || D.bench || D.tour);
const CH1 = K.ch.split(""), NT = CH1.length, TP = K.tPip;
const LEVEL = C.level, C2 = C.c2, C2H = C.c2h, EVEN = C.even, K_CLICK = C.kClick, K_MAX = C.kMax, CHOP = C.chop, GRAV = C.grav;
const PLOP = C.plop, SLAM_H = C.slamH, SLAM_V = C.slamV, H_MIN = C.hMin, H_MAX = C.hMax, S0 = C.s0, CROWN_Q = C.crownQ;
const Q_MAX = C.qMax, Q_TOP = Q_MAX * 2, MENISCUS = C.meniscus, CLS = K.cls;
const S = K.S, ENVC = K.envc, E_LAST = ENVC.length - 1, DMPQ = K.dmpq, KTDQ = K.ktdq, SPDQ = K.spdq, KEQ = K.keq;
const SW1 = K.sw1, SWP1 = K.swp1, SWP2 = K.swp2, CAU = K.cau, SLANT = K.slant;
const AIR = K.air, BODY = K.body, GL = K.gl, GR = K.gr, GLASS_ROWS = K.glassRows, HEXS = K.hex;
const PIP_X = K.pipX, PIP_ROW = K.pipRow, GX = K.glassX;
const START = 0.4;
const CALM_MS = D.calmMs || 30000;
const COLS = [];
for (let i = 0; i < 520; i++) COLS.push(K.cols.slice(i * 16, i * 16 + 16));
const HEX2 = [];
for (let i = 0; i < 256; i++) HEX2.push(HEXS.slice(i * 2, i * 2 + 2));
const RX = [];
for (let y = 0; y < 16; y++) RX.push(new RegExp(".{" + y + "}(.).{" + (15 - y) + "}", "g"));
const list = (x) => {
const a = D.typed && typeof Float64Array === "function" ? new Float64Array(NP + 2) : [];
for (let i = 0; i < NP + 2; i++) a[i] = x;
return a;
};
let h = list(START), v = list(0);
const HS = list(START);
let kNow = 0, kWant = 0, spin = 0;
let hTop = H_MAX;
let env = -1, amp = 1;
let level = START, fix = 0, tot = 0, act = 0, sway = 0, sw = 0, lo = 8, resets = 0;
const drops = [];
const foam = [];
const cool = [0, 0];
const R = [""];
for (let i = 0; i < 16; i++) R.push(AIR[i]);
function tap(strength) {
env = 0;
amp = strength;
}
function turn(clicks) {
const room = 1 - (kWant * clicks > 0 ? kWant : 0) / (clicks > 0 ? K_MAX : -K_MAX);
if (room > 0) kWant += clicks * K_CLICK * room;
spin += clicks > 0 ? clicks : -clicks;
}
function drop(x, y, vx, vy) {
if (drops.length < 8) drops.push([x, y, vx, vy, x, y]);
}
function crown() {
const dx = [-2.2, -0.8, 0.8, 2.2];
for (let i = 0; i < 4; i++) {
const x = 35.5 + dx[i];
drop(x, 16 - h[x >> 2] - 1, dx[i] * 0.044 + (Math.random() - 0.5) * 0.06, -(0.4 + 0.2 * Math.random()));
}
foam.push([17, 3], [18, 3]);
}
function step(q) {
const hh = h, vv = v, dt = q * 0.25, c2h = C2H * dt, ev = EVEN * dt, dmp = DMPQ[q], add = fix, f = C2 * kNow * dt, top = hTop;
vv[0] -= f;
vv[LASTP] += f;
hh[NP] = hh[LASTP];
hh[NP + 1] = hh[LASTP - 1];
let x = hh[0], y = hh[1], z = 0, c = x * x, d = y * y, b = c, a = d, e = 0, i = 0, pull = 0, nv = 0, sum = 0;
while (i < NP) {
z = hh[i + 2];
e = z * z;
pull = (b + d) * 0.5 + (a + e) * 0.125 - c * 1.25;
nv = (vv[i] + c2h * pull) * dmp;
vv[i] = nv;
x += nv * dt + add + ev * pull;
if (x < H_MIN) x = H_MIN;
else if (x > top) x = top;
hh[i] = x;
sum += x;
x = y;
y = z;
a = b;
b = c;
c = d;
d = e;
i++;
}
tot = sum;
fix = level - sum / NP;
}
function advance(q) {
const dt = q * 0.25;
kWant *= KTDQ[q];
spin *= SPDQ[q];
kNow += (kWant - kNow) * KEQ[q];
if (env >= 0) {
let e1 = env + q;
if (e1 > E_LAST) e1 = E_LAST;
const imp = (ENVC[e1] - ENVC[env]) * amp;
v[S0] += imp * S[0];
v[S0 + 1] += imp * S[1];
v[S0 + 2] += imp * S[2];
v[S0 + 3] += imp * S[3];
v[S0 + 4] += imp * S[4];
v[S0 + 5] += imp * S[5];
if (env < CROWN_Q && e1 >= CROWN_Q && amp > 0.7) crown();
env = e1 < E_LAST ? e1 : -1;
}
if (q > Q_MAX) {
step(q >> 1);
step(q - (q >> 1));
} else step(q);
if (tot !== tot) {
for (let i = 0; i < NP; i++) {
h[i] = level;
v[i] = 0;
}
fix = kNow = kWant = 0;
env = -1;
resets++;
report("water", "reset");
}
if (spin > 3) {
const x = 1 + ((Math.random() * (NP - 3)) | 0), a = (Math.random() - 0.5) * CHOP * (spin > 8 ? 1 : (spin - 3) / 5);
v[x] += a;
v[x + 1] -= a;
}
let k = 0;
while (k < drops.length) {
const d = drops[k];
d[4] = d[0];
d[5] = d[1];
d[0] += d[2] * dt;
d[1] += d[3] * dt + 0.5 * GRAV * dt * dt;
d[3] += GRAV * dt;
if (d[0] < 0) {
d[0] = -d[0];
d[2] = -d[2] * 0.5;
} else if (d[0] > 71) {
d[0] = 142 - d[0];
d[2] = -d[2] * 0.5;
}
const xi = ((d[0] + 0.5) | 0) >> 2;
if (d[1] >= 15.5 - h[xi] && d[3] > 0) {
v[xi] -= PLOP;
v[xi > 0 ? xi - 1 : 1] += PLOP / 2;
v[xi < LASTP ? xi + 1 : LASTP - 1] += PLOP / 2;
drops.splice(k, 1);
continue;
}
k++;
}
if (cool[0] > 0) cool[0]--;
else if (h[0] - level > SLAM_H && v[0] > SLAM_V) slam(0, 0, 1);
if (cool[1] > 0) cool[1]--;
else if (h[LASTP] - level > SLAM_H && v[LASTP] > SLAM_V) slam(1, LASTP, -1);
}
function slam(w, x, inward) {
const many = v[x] > SLAM_V * 1.5 ? 2 : 1;
for (let m = 0; m < many; m++) {
let up = v[x] * 0.8;
if (up > 0.4) up = 0.4;
drop((w ? 71 : 0) + inward * (1 + 2 * m), 16 - h[x] - 1, inward * (0.06 + 0.14 * Math.random()), -(0.24 + up * (0.6 + 0.4 * Math.random())));
}
cool[w] = 4;
foam.push([w ? LAST : 0, 3], [w ? LAST - 1 : 1, 2]);
}
const PAIRS = [], CC = [];
for (let i = 0; i < 4096; i++) PAIRS.push(0);
for (let i = 0; i < NC; i++) CC.push("");
const CAUK = [], CAUS = [];
for (let i = 0; i < 16; i++) {
CAUK.push(-1);
CAUS.push("");
}
function pair(k) {
const B = k >> 6, C = k & 63, cl = CLS[(C - B) * 2 + 128];
let u1 = 63 - ((B * 3 + C + 2) >> 2), u2 = 63 - ((C * 3 + B + 2) >> 2);
if (u1 < 0) u1 = 0;
if (u2 < 0) u2 = 0;
PAIRS[k] = (u1 * 8 + cl) * 1024 + u2 * 8 + cl;
return PAIRS[k];
}
function colAt(j, add) {
const i = j >> 1, b = h[i], a = i > 0 ? h[i - 1] : b, c = i < LASTP ? h[i + 1] : b;
let u = (64 - b * 3 - (j & 1 ? c : a)) | 0;
const cl = CLS[(j & 1 ? c * 6 - b * 4 - a * 2 + 128 : b * 4 + c * 2 - a * 6 + 128) | 0];
if (j === 0 || j === LAST) u -= MENISCUS;
if (u < 0) u = 0;
if (add === 7 || cl === 7) return COLS[u * 8 + 7];
return COLS[u * 8 + (cl + add > 6 ? 6 : cl + add)];
}
function plot(dx, dy, ch) {
const x = (dx + 0.5) | 0, y = (dy + 0.5) | 0;
if (dy >= -0.5 && x >= 0 && x < 72 && y < 15.5 - h[x >> 2]) R[y + 1] = R[y + 1].slice(0, x) + ch + R[y + 1].slice(x + 1);
}
function render(ms) {
let src = h, i = 0;
if (sw > 0) {
const p1 = ((ms / 1600) | 0) % 18, p2 = 17 - (((ms / 2600) | 0) % 18);
src = HS;
while (i < NP) {
src[i] = h[i] + sw * (SWP1[i + p1] + SWP2[i + p2]);
i++;
}
}
let B = (src[0] * 4) | 0, C = 0, p = 0, j = 1;
i = 1;
while (i < NP) {
C = (src[i] * 4) | 0;
p = PAIRS[B * 64 + C] || pair(B * 64 + C);
CC[j] = COLS[p >> 10];
CC[j + 1] = COLS[p & 1023];
B = C;
i++;
j += 2;
}
CC[0] = colAt(0, 0);
CC[LAST] = colAt(LAST, 0);
const g = (((ms / 340) | 0) % 80) - 12;
if (g > 0 && g < LAST) CC[g] = colAt(g, 2);
let k = 0;
while (k < foam.length) {
const f = foam[k];
CC[f[0]] = colAt(f[0], 7);
if (--f[1] <= 0) foam.splice(k, 1);
else k++;
}
const s = CC.join("");
h[NP] = h[NP + 1] = h[0];
const mx = Math.max.apply(null, h), mn = Math.min.apply(null, h);
let hi = (16.4 - mn) | 0;
lo = (15.1 - mx) | 0;
if (lo < 0) lo = 0;
if (hi > 12) hi = 12;
hi += 3;
act = mx - level > level - mn ? mx - level : level - mn;
sway += ((h[14] - h[3]) * 1.6 - sway) * 0.3;
const drift = ((ms / 900) | 0) + ((sway + 72.5) | 0), rough = act > 1.5 ? 1 : 0, cau = CAU[rough];
let y = 0;
while (y < 16) {
if (y < lo) R[y + 1] = AIR[y];
else if (y > hi) {
const off = (drift + SLANT[y]) % 72;
if (CAUK[y] !== off + rough * 128) {
CAUK[y] = off + rough * 128;
CAUS[y] = cau[y].slice(off, off + 72);
}
R[y + 1] = CAUS[y];
} else if (y < GLASS_ROWS) {
let row = s.replace(RX[y], "$1$1");
const gx = GX[y];
if (row.charAt(gx) === "a") row = row.slice(0, gx) + GL.charAt(y) + row.slice(gx + 1);
if (row.charAt(71 - gx) === "a") row = row.slice(0, 71 - gx) + GR.charAt(y) + row.slice(72 - gx);
R[y + 1] = row;
} else R[y + 1] = s.replace(RX[y], "$1$1");
y++;
}
k = drops.length;
while (k > 0) {
k--;
plot(drops[k][4], drops[k][5], CH1[K.tTail]);
plot(drops[k][0], drops[k][1], CH1[K.tDrop]);
}
if (pf > 0) pips();
}
let sel = 0, page = 0, pf = 0;
let tsel = 0, pm = 0;
let pipKey = -1, pipStrip = "", pipSide = "", pipUp = "", pipDown = "";
function put(row, x, s) {
return row.slice(0, x) + s + row.slice(x + s.length);
}
function pips() {
const lit = page === 2 || (page === 0 && pm > 0) ? tsel : sel;
if (pipKey !== lit * 8 + pf) {
pipKey = lit * 8 + pf;
const tone = (to, y) => CH1[(BODY[y] + ((to - BODY[y]) * pf) / 4 + 0.5) | 0];
const base = CH1[BODY[PIP_ROW]], core = tone(TP[0], PIP_ROW);
pipStrip = "";
for (let k = 0; k < 8; k++) {
const c = k === lit ? core : "ABCDEFGH".charAt(k);
pipStrip += c + c + (k < 7 ? base + base : "");
}
pipSide = tone(TP[1], PIP_ROW);
pipUp = tone(TP[2], PIP_ROW - 1);
pipUp += pipUp;
pipDown = tone(TP[3], PIP_ROW + 1);
pipDown += pipDown;
}
const x = PIP_X + 4 * lit;
let r = put(R[PIP_ROW + 1], PIP_X, pipStrip);
r = put(r, x - 1, pipSide);
R[PIP_ROW + 1] = put(r, x + 2, pipSide);
R[PIP_ROW] = put(R[PIP_ROW], x, pipUp);
R[PIP_ROW + 2] = put(R[PIP_ROW + 2], x, pipDown);
}
const cur = [], src = [], rbNow = [];
let mixU = 256, rbTick = -1, headKey = -1;
const PRE = '{"application_name":"' + APP + '","priority":50,"elements":[{"id":"w_t","type":"xpmbitmap","x":0,"y":0,' +
'"align":"top_left","timeout":' + T + ',"z_index":1,"data":"';
function lerp(out, a, b, u) {
const t = 256 - u;
for (let i = 0; i < NT; i++) {
const ca = a[i], cb = b[i];
out[i] = ((((ca >> 16) * t + (cb >> 16) * u) >> 8) << 16) | (((((ca >> 8) & 255) * t + ((cb >> 8) & 255) * u) >> 8) << 8) |
(((ca & 255) * t + (cb & 255) * u) >> 8);
}
}
function hex(c) {
return HEX2[c >> 16] + HEX2[(c >> 8) & 255] + HEX2[c & 255];
}
function blend(a, b, u) {
const t = 256 - u;
return ((((a >> 16) * t + (b >> 16) * u) >> 8) << 16) | (((((a >> 8) & 255) * t + ((b >> 8) & 255) * u) >> 8) << 8) |
(((a & 255) * t + (b & 255) * u) >> 8);
}
function rainbow(ms) {
const ph = ms / K.rbMs, a = (ph | 0) % 12;
lerp(rbNow, K.rb[a], K.rb[(a + 1) % 12], ((ph - (ph | 0)) * 256) | 0);
}
const GLASS2 = "\\ny c #" + hex(K.glass[0]) + "\\nz c #" + hex(K.glass[1]);
let tones = "";
function ramp() {
let s = "";
for (let i = 0; i < NT; i++) s += "\\n" + CH1[i] + " c #" + hex(cur[i]);
tones = s + GLASS2;
}
function header() {
if (pf > 0) {
const floor = cur[BODY[PIP_ROW]];
let s = "";
for (let k = 0; k < 8; k++) {
let c = k === 7 ? blend(0, rbNow[K.pipTone], 159) : K.pips[k];
if (pm > 0) c = blend(c, K.dot, pm * 64);
s += "\\n" + "ABCDEFGH".charAt(k) + " c #" + hex(blend(floor, c, pf * 64));
}
R[0] = PRE + "! XPM2\\n72 16 " + (NT + 10) + " 1" + tones + s;
} else {
R[0] = PRE + "! XPM2\\n72 16 " + (NT + 2) + " 1" + tones;
}
}
function colours(ms) {
let changed = false;
if (sel === 7 || pf > 0) {
const tick = (ms / 500) | 0;
if (tick !== rbTick) {
rbTick = tick;
rainbow(ms);
changed = true;
}
}
if (mixU < 256) {
mixU += 48;
if (mixU > 256) mixU = 256;
lerp(cur, src, sel === 7 ? rbNow : K.ramps[sel], mixU);
changed = true;
} else if (changed && sel === 7) {
for (let i = 0; i < NT; i++) cur[i] = rbNow[i];
}
const key = pf + pm * 8;
if (changed) {
ramp();
cornerDue = true;
}
if (toy) {
const lit = toy.blink ? ((ms / toy.blink) | 0) % 2 === 0 : true;
if (changed || tf !== toyFade || lit !== toyLit) {
toyLit = lit;
toyInk();
}
}
if (changed || key !== headKey) {
headKey = key;
header();
}
}
function choose(k) {
for (let i = 0; i < NT; i++) src[i] = cur[i];
sel = k;
mixU = 0;
}
const ALPHA = ["00", "30", "68", "A0", "D0"];
const DIM = ["00", "18", "30", "48", "60"];
const WX = D.x;
let nameA = 0, nameSent = "", nameAt = 0, nameUp = false;
let word = "", mark = "";
function nameJson() {
return ',{"id":"w_n","type":"text","text":"' + word + '","font":"small","x":' + WX[word] + ',"y":-1,' +
'"align":"top_left","color":"#FFFFFF' + ALPHA[nameA] + '","timeout":' + T + ',"z_index":5}' +
(mark ? ',{"id":"w_m","type":"text","text":"' + mark + '","font":"small","x":2,"y":-1,"align":"top_left","color":"#FFFFFF' +
DIM[nameA] + '","timeout":' + T + ',"z_index":5}' : "");
}
let flying = null;
async function landed() {
if (flying) {
const got = await flying;
flying = null;
if (!got.ok) {
errs.draw++;
report("draw", got.status + " " + got.text.slice(0, 80));
}
}
}
function send(more) {
const last = R[16];
R[16] = last + '"}' + more + "]}";
flying = call("POST", "display/draw", R.join("\\n"));
R[16] = last;
}
async function take(ids) {
await landed();
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ids }));
}
let cornerDue = true, cornerAt = 0;
function corners() {
const el = (id, x, rows, glass) => {
let pal = "! XPM2\\n4 4 " + (K.cornerMix.length + 2) + " 1\\n. c none\\na c #000000";
for (let k = 0; k < K.cornerMix.length; k++) {
pal += "\\n" + K.cornerKeys.charAt(k) + " c #" + hex(blend(glass, cur[BODY[12 + K.cornerMix[k][0]]], K.cornerMix[k][1]));
}
return ',{"id":"' + id + '","type":"xpmbitmap","x":' + x + ',"y":12,"align":"top_left","timeout":' + STILL + ',"z_index":2,"data":"' +
pal + "\\n" + rows.join("\\n") + '"}';
};
return el("w_cl", 0, K.corner, K.cornerGlass[0]) + el("w_cr", 68, K.cornerR, K.cornerGlass[1]);
}
const TOYS = K.toys, GRAV_T = K.gravT, PUSH = K.push, LAND = K.land, HOME = K.home;
const TOYN = K.toyNames, FLOAT_X = K.floatX;
let toy = null, toyName = "", tx = 0, ty = 0, tvx = 0, tvy = 0, tilt = 0, face = 0, air = false;
let toyHead = "", toyKey = -1, toyInkN = 0, toyAt = 0, toyUp = false, toyLit = true, toyFade = -1;
let tf = 0;
function setToy(name, x) {
toyName = name;
toy = TOYS[name] || null;
if (toy) {
tx = x === undefined ? K.toyX : x;
ty = x === undefined ? 16 - h[tx >> 2] : toy.above;
tvx = tvy = tilt = 0;
face = 0;
air = x !== undefined;
toyInk();
}
}
function toyInk() {
const keys = toy.keys, ink = toy.ink, f = 256 - tf * 64, wet = cur[K.tUnder], body = cur[BODY[10]];
let s = "", n = 2;
for (let i = 0; i < keys.length; i++) {
const k = keys.charAt(i);
let c = ink[i];
if (!toyLit) c = k === "L" ? 0x60460e : k === "u" ? 0 : c;
s += "\\n" + k + " c #" + hex(blend(0, c, f));
n++;
if (k >= "a") {
s += "\\n" + k.toUpperCase() + " c #" + hex(blend(body, blend(c, wet, 146), f));
n++;
}
}
toyFade = tf;
toyInkN++;
toyHead = "! XPM2\\n" + toy.w + " " + toy.h + " " + n + " 1\\n. c none\\n_ c #" + hex(blend(body, cur[K.tShadow], f)) + s + "\\n";
}
function floatToy(n, ms) {
const m = toy.move;
let ci = tx >> 2;
if (ci < 1) ci = 1;
else if (ci > NP - 2) ci = NP - 2;
let slope = (h[ci + 1] - h[ci - 1]) * 0.5;
if (slope > 3) slope = 3;
else if (slope < -3) slope = -3;
const line = 16 - (h[ci - 1] + h[ci] + h[ci] + h[ci + 1]) * 0.25 - SW1[((ms / 90) | 0) % 36] * 2.6;
let push = PUSH * (kNow - slope) * 0.5;
push += ((page === 2 ? FLOAT_X : gN >= 0 ? K.guideDuckX : 36) - tx) * HOME * (gN >= 0 ? 60 : page === 2 ? 6 : 1);
const rise = v[ci] > 0 ? -v[ci] * m[5] : -v[ci];
let i = 0;
while (i < n) {
if (ty > line - 0.3) {
if (air) {
air = false;
if (tvy > LAND) {
v[ci] -= 0.14;
v[ci - 1] += 0.07;
v[ci + 1] += 0.07;
drop(tx - 2, ty - 1, -0.3, -0.28);
drop(tx + 2, ty - 1, 0.3, -0.28);
foam.push([tx >> 1, 2]);
}
}
tvy = rise + (tvy - rise) * m[1] + (line - ty) * m[0];
tvx = (tvx + push) * m[2];
} else {
air = true;
tvy += GRAV_T;
}
ty += tvy;
tx += tvx;
i++;
}
if (ty > 16 - toy.under) {
ty = 16 - toy.under;
tvy = 0;
} else if (ty < toy.above) {
ty = toy.above;
if (tvy < 0) tvy = 0;
}
const half = toy.w / 2;
if (tx < half || tx > 72 - half) {
tx = tx < half ? half : 72 - half;
if (tvx > 0.05 || tvx < -0.05) face = 1 - face;
tvx = -tvx * m[3];
}
if (n > 0) tilt += (slope * m[4] - tilt) * 0.35;
}
let toyX = 0, toyY = 0, toyS = 0;
function toyNow() {
let t = tilt > -2.5 ? ((tilt + 2.5) | 0) - 2 : -2;
if (t > 2) t = 2;
toyS = ((toy.faces > 1 ? face : 0) * toy.frames + (toy.roll ? ((tx / toy.roll) | 0) % toy.frames : 0)) * 5 + t + 2;
toyX = (tx - toy.w / 2 + 0.5) | 0;
toyY = ((ty + 0.5) | 0) - toy.wl;
return toyInkN * 1048576 + (toyX + 16) * 8192 + (toyY + 16) * 128 + toyS;
}
function toyJson() {
return ',{"id":"w_y","type":"xpmbitmap","x":' + toyX + ',"y":' + toyY + ',"align":"top_left","timeout":' + T + ',"z_index":3,"data":"' +
toyHead + toy.spr[toyS] + '"}';
}
let calmOn = true, kept = 0;
let pick = "", seen = "";
let flipWas = -1, resetDue = false;
let seenGuide = false;
async function load() {
const file = await call("GET", "storage/read?path=/ext/data/water.json");
try {
const got = file.ok && !D.fresh && !D.demo ? JSON.parse(file.text) : null;
if (got && typeof got.w === "number" && got.w >= 0 && got.w < 8) sel = kept = got.w | 0;
if (got && (got.r === 1 || got.r === 0)) flipWas = got.r;
if (got && typeof got.t === "string" && TOYN.indexOf(got.t) >= 0) pick = got.t;
if (got && typeof got.s === "string") seen = got.s;
if (got && got.g === 1) seenGuide = true;
} catch (err) {
}
}
function save(water) {
kept = water;
if (D.demo) return null;
return call("POST", "storage/write?path=/ext/data/water.json",
JSON.stringify({ w: water, r: flipWas === 1 ? 1 : 0, t: pick, s: seen, g: seenGuide ? 1 : 0 }), "application/octet-stream");
}
async function readSettings() {
const s = await loadSettings();
calmOn = s.calm !== false;
const set = typeof s.toy === "string" && TOYN.indexOf(s.toy) >= 0 ? s.toy : K.toyDefault;
const flip = s.reset === true ? 1 : 0;
let keep = false;
if (set !== seen || !pick) {
if (seen && set !== seen) pick = set;
else if (!pick) pick = set;
seen = set;
keep = true;
}
if (flipWas < 0) {
flipWas = flip;
keep = true;
} else if (flip !== flipWas) {
flipWas = flip;
resetDue = true;
seenGuide = false;
pick = set;
await save(0);
keep = false;
}
if (keep && !D.demo && !D.fresh) await save(kept);
if (!D.tour && pick !== toyName && page !== 2) setToy(pick);
}
let backs = 0;
onBack = () => {
backs++;
return true;
};
let demoAt = 0, demoT0 = 0;
function demo(now) {
const list = D.demo;
if (!demoT0) demoT0 = now;
while (demoAt < list.length && now - demoT0 >= list[demoAt][0]) {
const what = list[demoAt++][1];
if (what === "s") ctl.start++;
else if (what === "o") ctl.ok++;
else if (what === "b") backs++;
else ctl.turn += what;
}
if (demoAt >= list.length && now - demoT0 > list[list.length - 1][0] + 6000) {
demoAt = 0;
demoT0 = now;
}
}
let gN = -1, gDue = false, gBand = 0, gBandAt = 0, gHot = 0, gHotWas = -1, gGoal = 0, gTop = 0, gPalDue = false;
const OVR = [], OVP = [];
function guideRows() {
const none = "........................................................................";
for (let n = 0; n < K.book.length; n++) {
const rows = [], page = K.book[n];
for (let y = 0; y < 16; y++) {
const p = page[y];
rows.push(p ? none.slice(0, p[0]) + p[1] + none.slice(p[0] + p[1].length) : none);
}
OVR.push(rows.join("\\n"));
}
}
function guidePalettes() {
pressMarks();
OVP.length = 0;
for (let hot = 0; hot < 2; hot++) {
for (let band = 0; band < 4; band++) {
let s = "";
for (let k = 0; k < 20; k++) {
const glow = (k & 3) === band ? K.bookGlow[hot][0] : (k & 3) === ((band + 3) & 3) ? K.bookGlow[hot][1] : 0;
s += "\\n" + "abcdefghijklmnopqrst".charAt(k) + " c #" + hex(blend(cur[K.bookLevels[k >> 2]], 0xffffff, glow));
}
for (let k = 0; k < K.bookFixed.length; k++) s += "\\n" + K.bookFixed[k][0] + " c #" + hex(cur[K.bookFixed[k][1]]);
OVP.push(s + "\\nG c #" + hex(K.bookDots[0]) + "\\nH c #" + hex(K.bookDots[1]));
}
}
}
function guidePage(n) {
gN = n;
gDue = true;
gGoal = K.guideLevel[n];
gTop = K.guideTop[n];
if (n === 2 && toy) {
tx = K.guideDuckX;
ty = 16 - h[tx >> 2];
tvx = tvy = tilt = 0;
face = 0;
air = false;
}
if (n === 0) tap(K.guideTap[0]);
}
function guideBegin() {
guidePalettes();
setToy("duck");
tx = K.guideDuckX;
tf = 4;
kWant = kNow = 0;
gHotWas = -1;
guidePage(0);
}
function guideEnd() {
gN = -1;
hTop = H_MAX;
setToy(pick);
}
function layerJson(n, pal) {
return ',{"id":"w_b","type":"xpmbitmap","x":0,"y":0,"align":"top_left","timeout":' + STILL + ',"z_index":4,"data":"! XPM2\\n72 16 ' +
(23 + K.bookFixed.length) + " 1\\n. c none" + pal + "\\n" + OVR[n] + '"}';
}
const TITLE_N = 5;
let titleOn = false, titleAt = 0, titleFade = 0, layerUp = false;
const PM = [], QM = [];
let pmWas = -1, pmUp = false, qmWas = -1, qmUp = false;
function pressMarks() {
PM.length = 0;
for (let where = 0; where < 2; where++) {
const c = cur[K.pressTone[where]], head = ',{"id":"w_p","type":"xpmbitmap","x":' + K.pressX + ',"y":0,"align":"top_left","timeout":' + STILL +
',"z_index":5,"data":"! XPM2\\n5 5 3 1\\n. c none\\n# c #' + hex(c) + "\\ng c #" + hex(blend(c, 0, 102)) + "\\n";
for (let f = 0; f < 2; f++) PM.push(head + K.press[f].join("\\n") + '"}');
}
PM.push(',{"id":"w_p","type":"xpmbitmap","x":300,"y":0,"align":"top_left","timeout":' + T + ',"z_index":5,"data":"! XPM2\\n1 1 1 1\\n. c none\\n."}');
let pal = "";
for (let l = 0; l < 5; l++) pal += "\\n" + l + " c #" + hex(cur[K.bookLevels[l]]);
QM.length = 0;
for (let f = 0; f < 3; f++) {
QM.push(',{"id":"w_q","type":"xpmbitmap","x":' + (f < 2 ? K.startX : 300) + ',"y":' + (f === 0 ? 1 : 0) + ',"align":"top_left","timeout":' + STILL +
',"z_index":5,"data":"! XPM2\\n6 3 6 1\\n. c none' + pal + "\\n" + K.drop.join("\\n") + '"}');
}
}
function titleBegin(now) {
titleOn = true;
titleAt = now;
titleFade = 0;
gDue = true;
tf = 4;
}
function fadedPalette(f) {
let s = "";
for (let k = 0; k < 20; k++) s += "\\n" + "abcdefghijklmnopqrst".charAt(k) + " c #" + hex(blend(cur[K.bookLevels[k >> 2]], 0, f * 64));
for (let k = 0; k < K.bookFixed.length; k++) s += "\\n" + K.bookFixed[k][0] + " c #" + hex(blend(cur[K.bookFixed[k][1]], 0, f * 64));
return s + "\\nG c #000000\\nH c #000000";
}
async function bye() {
await landed();
R[0] = PRE + "! XPM2\\n72 16 1 1\\na c #000000";
for (let i = 1; i <= 16; i++) R[i] = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
await take(toyUp ? ["w_y", "w_cl", "w_cr"] : ["w_cl", "w_cr"]);
send("");
await landed();
if (errs.draw) saveErrs();
stopped = true;
setTimeout(unbind, 10);
}
const back = (u) => 1 + 2.2 * (u - 1) * (u - 1) * (u - 1) + 1.2 * (u - 1) * (u - 1);
const SPLASH_MS = 1500;
async function main() {
const born = Date.now();
await call("POST", "display/draw", '{"application_name":"' + APP + '","priority":50,"elements":[{"id":"w_s","type":"animation",' +
'"path":"animations/splash.anim","x":0,"y":0,"align":"top_left","loop":false,"section":"default","timeout":5,"z_index":2147483000}]}');
rainbow(0);
for (let i = 0; i < NT; i++) cur[i] = K.ramps[0][i];
ramp();
header();
guideRows();
if (D.bench) await bench();
await load();
await readSettings();
if (resetDue) sel = 0;
resetDue = false;
if (sel !== 0) for (let i = 0; i < NT; i++) cur[i] = (sel === 7 ? rbNow : K.ramps[sel])[i];
ramp();
header();
if (toy) toyInk();
for (let i = 0; i < NP; i++) v[i] = -SW1[i * 2] * 0.24;
while (Date.now() - born < SPLASH_MS && backs === 0) await nap(SPLASH_MS - (Date.now() - born));
if (backs > 0) {
await take(["w_s"]);
stopped = true;
setTimeout(unbind, 10);
return;
}
ctl.turn = ctl.ok = ctl.start = 0;
send(corners());
cornerDue = false;
await take(["w_s"]);
const t00 = Date.now();
let phase = 0, phaseT0 = t00, from = START;
let gOff = false;
if (!D.demo && !D.tour) {
guidePalettes();
if (!seenGuide) {
phase = 4;
for (let i = 0; i < NP; i++) v[i] = 0;
guideBegin();
} else titleBegin(t00);
}
let last = t00, acc = 0, tq = 0, quietAt = t00, touched = t00, calmAt = t00, settingsDue = t00 + 5000;
let left = 0, shown = 0, shownAt = t00, work = 0, sent = 0, steps = 0, fpsText = "", fpsSent = "", fpsAt = 0;
let stepAt = 0;
let later = null, keepDue = false, markUp = false;
const errAt = TEST ? 3000 : 100000;
const LOG = D.fps && D.demo ? [] : null;
let logged = false;
if (LOG) for (let i = 0; i < 40; i++) LOG.push([0, 0, 0, 0, 0, 0, 0, 0, 0]);
let tourK = -1;
while (!stopped) {
try {
const t0 = Date.now(), ms = t0 - t00;
if (D.demo) demo(t0);
if (D.tour) {
const k = (ms / 3500) | 0;
if (k !== tourK) {
tourK = k;
setToy(TOYN[1 + (k % 7)]);
const water = [1, 6, 0][((k / 7) | 0) % 3];
if (water !== sel) choose(water);
}
}
const turned = ctl.turn, ok = ctl.ok, start = ctl.start, bk = backs > 0, bkN = backs;
if (turned || ok || start || bk) {
ctl.turn = ctl.ok = ctl.start = 0;
backs = 0;
touched = quietAt = t0;
}
if (resetDue && titleOn && phase !== 4) {
titleOn = false;
gOff = true;
}
if (resetDue && phase === 4) {
resetDue = false;
if (sel !== 0) {
choose(0);
gPalDue = true;
}
guidePage(0);
} else if (resetDue) {
resetDue = false;
phase = 3;
phaseT0 = t0;
from = level;
page = 0;
quietAt = t0;
later = null;
if (toyName !== pick) setToy(pick);
}
const guideKeys = phase === 4 || titleOn;
if (phase === 4 && (turned || ok || start || bk)) {
const lastN = TITLE_N - 1, to = gN + ok + start + turned - bkN;
if (gN === lastN || to > lastN || (to < 0 && bkN > 0)) {
seenGuide = true;
keepDue = true;
guideEnd();
phase = 0;
phaseT0 = t0;
from = level;
calmAt = t0;
titleBegin(t0);
} else {
if (ok || start) tap(K.guideTap[1]);
if (turned) kWant += turned > 0 ? K.guideTouch : -K.guideTouch;
gHot = t0;
if (to !== gN) guidePage(to < 0 ? 0 : to);
}
} else if (titleOn && phase < 2 && (ok || start || bk)) {
if (bk) {
titleOn = false;
gOff = true;
phase = 2;
phaseT0 = t0;
from = level;
} else if (ok) {
phase = 4;
guideBegin();
} else titleAt = 0;
}
if (titleOn && phase < 2 && t0 - titleAt > K.titleMs) {
titleOn = false;
phase = 0;
phaseT0 = t0;
from = level;
calmAt = touched = t0;
}
if (phase >= 2 || guideKeys) {
} else if (page === 0) {
if (bk) {
phase = 2;
phaseT0 = t0;
from = level;
} else {
if (start) tap(1);
if (turned) turn(turned > 6 ? 6 : turned < -6 ? -6 : turned);
if (ok && phase === 1) {
stepAt = t0;
page = 1;
pm = 0;
word = K.names[sel];
mark = K.marks[0];
}
}
} else if (page === 1) {
if (turned) {
choose((((sel + turned) % 8) + 8) % 8);
word = K.names[sel];
nameA = 1;
}
if (bk) {
page = 0;
keepDue = sel !== kept;
} else if ((ok || start) && t0 - stepAt > 250) {
keepDue = sel !== kept;
stepAt = t0;
page = 2;
if (later !== null) {
toyName = later;
later = null;
}
tsel = TOYN.indexOf(toyName);
if (tsel < 0) tsel = 0;
setToy(toyName, FLOAT_X);
word = K.toyWords[tsel];
mark = K.marks[1];
nameA = 1;
}
} else {
if (turned) {
tsel = (((tsel + turned) % 8) + 8) % 8;
setToy(TOYN[tsel], FLOAT_X);
word = K.toyWords[tsel];
nameA = 1;
}
if (bk) {
page = 1;
later = pick;
word = K.names[sel];
mark = K.marks[0];
nameA = 1;
} else if ((ok || start) && t0 - stepAt > 250) {
stepAt = t0;
page = 0;
if (toyName !== pick) {
pick = toyName;
keepDue = true;
}
}
}
if (phase === 0) {
const u = (t0 - phaseT0) / 1500;
const goal = titleOn ? K.titleLevel : LEVEL;
level = u < 1 ? from + (goal - from) * back(u) : goal;
if (u >= 1) phase = 1;
} else if (phase === 2) {
const u = (t0 - phaseT0) / 500;
if (u >= (toy ? 1.7 : 1)) break;
level = u < 1 ? from + (0.3 - from) * u * u : 0.3;
} else if (phase === 3) {
const u = (t0 - phaseT0) / 500;
level = u < 1 ? from + (0.3 - from) * u * u : 0.3;
word = K.freshWord;
mark = "";
if (u >= 1 && sel !== 0) choose(0);
if (u >= 3.8) {
nameA = 0;
from = level;
phaseT0 = touched = calmAt = t0;
if (!seenGuide && !D.demo) {
phase = 4;
guideBegin();
} else {
phase = 0;
setToy(pick);
for (let i = 0; i < NP; i++) v[i] = -SW1[i * 2] * 0.24;
}
}
} else if (phase === 4) {
const e = (t0 - last) * 0.0025;
level += (gGoal - level) * (e > 1 ? 1 : e);
hTop = gTop > level + 0.5 ? gTop : level + 0.5;
if (gN === 1) {
const lean = K.guideLean * (1 + 1.6 * SW1[((ms / 120) | 0) % 36]), r = e > 0.5 ? 0.5 : e;
for (let i = 0; i < NP; i++) {
const want = level + lean * (8.5 - i);
h[i] += ((want < 0.4 ? 0.4 : want) - h[i]) * r;
}
}
if (gPalDue && mixU >= 256) {
gPalDue = false;
guidePalettes();
gDue = true;
}
} else if (calmOn && !titleOn && page === 0 && t0 - touched > CALM_MS && t0 - calmAt > CALM_MS) {
calmAt = quietAt = t0;
const r = Math.random();
if (r < 0.4) tap(0.38);
else turn(r < 0.7 ? 2 : -2);
}
let fading = false;
if (pf !== (page ? 4 : 0)) {
pf += page ? 1 : -1;
fading = true;
}
if (page === 2 ? pm < 4 : page === 1 && pm > 0) {
pm += page === 2 ? 1 : -1;
fading = true;
}
const tfWant = page === 1 || (gN >= 0 && gN !== 2) || titleOn ? 4 : 0;
if (gN >= 0 && gN !== 2) tf = 4;
if (tf !== tfWant) {
tf += tf < tfWant ? 1 : -1;
fading = true;
}
if (later !== null && (tf === 4 || page !== 1)) {
if (later !== toyName) setToy(later);
later = null;
}
const wordA = phase === 3 ? (t0 - phaseT0 > 500 && t0 - phaseT0 < 1600 ? 4 : 0) : pf;
if (nameA !== wordA) {
nameA += nameA < wordA ? 1 : -1;
fading = true;
}
let dtm = t0 - last;
last = t0;
if (dtm > 250) dtm = 250;
acc += dtm * 0.12;
let q = acc | 0;
acc -= q;
if (q > Q_TOP) q = Q_TOP;
const moving = act > 0.06 || drops.length > 0 || env >= 0 || kWant > 0.004 || kWant < -0.004 || (phase !== 1 && phase !== 4) ||
(phase === 4 && (gN === 1 || level - gGoal > 0.03 || gGoal - level > 0.03));
if (moving || fading || mixU < 256) quietAt = t0;
const rest = t0 - quietAt > 1200;
if (moving) sw = sw > 0.34 ? sw - 0.34 : 0;
else if (sw < 1) sw = sw > 0.9 ? 1 : sw + 0.1;
const ta = LOG ? Date.now() : 0;
if (q > 0 && (moving || act > 0.02)) advance(q);
const tb1 = LOG ? Date.now() : 0;
tq += q;
if (toy && tf < 4) floatToy(tq >> 2, ms);
tq &= 3;
const tb = LOG ? Date.now() : 0;
colours(ms);
const tc = LOG ? Date.now() : 0;
render(ms);
const td = LOG ? Date.now() : 0;
let more = "";
if (pf > 0 || nameUp || nameA > 0) {
if (pf === 0 && nameA === 0) {
nameUp = false;
nameSent = "";
await take(markUp ? ["w_n", "w_m"] : ["w_n"]);
markUp = false;
mark = "";
} else {
if (markUp && !mark) {
markUp = false;
await take(["w_m"]);
}
const s = nameJson();
if (s !== nameSent || t0 - nameAt > 8000) {
more = s;
nameSent = s;
nameAt = t0;
nameUp = true;
if (mark) markUp = true;
}
}
}
if (gN >= 0 || titleOn) {
const hot = gN >= 0 && t0 - gHot < 900 ? 1 : 0;
if (t0 - gBandAt > (hot ? K.bookStep >> 1 : K.bookStep)) {
gBand = (gBand + 1) & 3;
gBandAt = t0;
gDue = true;
}
if (gDue || hot !== gHotWas) {
more += layerJson(gN >= 0 ? gN : TITLE_N, OVP[hot * 4 + gBand]);
gDue = false;
gHotWas = hot;
layerUp = true;
titleFade = 0;
}
const frame = ms % (K.pressMs[0] + K.pressMs[1]) < K.pressMs[0] ? 0 : 1;
const pm = gN === 2 ? frame : gN < 0 ? 2 : 4;
if (pm !== pmWas && (pm < 4 || pmUp)) {
more += PM[pm];
pmWas = pm;
pmUp = pm < 4;
}
const up = (ms + 400) % (K.startMs[0] + K.startMs[1]) < K.startMs[0] ? 0 : 1;
const qm = gN === 0 || gN < 0 ? up : 2;
if (qm !== qmWas && (qm < 2 || qmUp)) {
more += QM[qm];
qmWas = qm;
qmUp = qm < 2;
}
} else if (layerUp) {
if (titleFade < 3 && !gOff) {
more += layerJson(TITLE_N, fadedPalette(++titleFade));
if (pmUp) {
more += PM[4] + QM[2];
pmUp = qmUp = false;
}
} else {
layerUp = gOff = pmUp = qmUp = false;
pmWas = qmWas = -1;
await take(["w_b", "w_p", "w_q"]);
}
}
if (toy && tf < 4) {
const key = toyNow();
if (key !== toyKey || t0 - toyAt > 8000) {
more += toyJson();
toyKey = key;
toyAt = t0;
toyUp = true;
}
} else if (toyUp) {
toyUp = false;
toyKey = -1;
await take(["w_y"]);
}
if (cornerDue || t0 - cornerAt > 60000) {
cornerDue = false;
cornerAt = t0;
more += corners();
}
if (D.fps && fpsText && (fpsText !== fpsSent || t0 - fpsAt > 8000)) {
more += ',{"id":"w_f","type":"text","text":"' + fpsText + '","font":"small","x":3,"y":8,"align":"top_left","color":"#FFFFFFC0",' +
'"timeout":' + T + ',"z_index":6}';
fpsSent = fpsText;
fpsAt = t0;
}
const t1 = Date.now();
await landed();
if (keepDue) {
keepDue = false;
await save(sel);
}
send(more);
const t2 = Date.now();
if (LOG) {
const sec = (ms / 1000) | 0;
if (sec < 40) {
const row = LOG[sec];
row[0]++;
row[1] += ta - t0;
row[2] += tb1 - ta;
row[3] += tb - tb1;
row[4] += tc - tb;
row[5] += td - tc;
row[6] += t1 - td;
row[7] += t2 - t1;
row[8] += q;
} else if (!logged) {
logged = true;
let text = "Slosh " + D.ver + (D.typed ? " (Float64Array)" : "") + ": second, pictures, then mean ms a picture: keys+logic, water (physics), toy, colours, picture (its text), " +
"other elements, waiting for the picture before + sending; last: the water's time that second, in 1/30 s (30 = true speed)\n";
for (let i = 0; i < 40; i++) {
const row = LOG[i], k = row[0] || 1;
text += i + " " + row[0];
for (let j = 1; j < 8; j++) text += " " + Math.round((row[j] * 10) / k) / 10;
text += " " + row[8] / 4 + "\n";
}
await landed();
await call("POST", "storage/write?path=/ext/data/fps.txt", text, "application/octet-stream");
}
}
shown++;
work += t1 - t0;
sent += t2 - t1;
steps += q;
if (t2 - shownAt >= 2000) {
if (D.fps && !LOG) {
fpsText = Math.round((shown * 1000) / (t2 - shownAt)) + " " + Math.round(work / shown);
console.log(APP + ": fps " + Math.round((shown * 10000) / (t2 - shownAt)) / 10 + " work " + Math.round((work * 10) / shown) / 10 +
" ms, wait+send " + Math.round((sent * 10) / shown) / 10 + " ms, water time " + Math.round((steps * 250) / (t2 - shownAt)) / 30 +
(rest ? " rest" : " active"));
}
shown = work = sent = steps = 0;
shownAt = t2;
}
if (ms > errAt || errs.draw) saveErrs();
if (rest && t0 >= settingsDue) {
settingsDue = t0 + 5000;
await landed();
await readSettings();
}
left = (rest ? 170 : gN >= 0 ? 130 : 50) - (Date.now() - t0);
if (left > 4) await nap(left);
} catch (err) {
report("step", err);
await sleep(300);
}
}
await bye();
}
main().catch((err) => {
report("main", err);
stopped = true;
setTimeout(unbind, 10);
});
