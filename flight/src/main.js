// Flight: a focus timer as a flight on the BUSY Bar. Choose where you are, how long you want to focus and one of
// the airports that far away; a boarding pass is printed, the aircraft takes off, and while you work the window shows
// the sky of the place and the hour you are flying through. Landing is the end of the session; flights are kept in
// a logbook.
//
// This file is generated from the author's working sources (one file, so that the bar has one script to read):
// D = generated data (the 512 busiest airports, the countries, widths of the bar's letters, the small drawings,
// lengths of the animations), then the bar (its API, clock, controls, drawing, the change from one picture to the
// next), then the app (the airports and how the rest of them is fetched, the sun, moon and sky, the pages, the
// flight, the logbook), then the start.

const D = {"app":"io.github.windagh.flight","name":"Flight","n":3244,"stamp":"82ad9606","geoPer":600,"recPer":64,"country":{"US":"USA","GB":"UK","FR":"FRANCE","JP":"JAPAN","AE":"UAE","SG":"SINGAPORE","HK":"HONG KONG","NL":"NETHERLANDS","DE":"GERMANY","KR":"S. KOREA","CN":"CHINA","AU":"AUSTRALIA","TR":"TURKEY","CA":"CANADA","MX":"MEXICO","BR":"BRAZIL","AR":"ARGENTINA","CO":"COLOMBIA","PE":"PERU","ES":"SPAIN","IT":"ITALY","CH":"SWITZERLAND","AT":"AUSTRIA","DK":"DENMARK","SE":"SWEDEN","NO":"NORWAY","FI":"FINLAND","IE":"IRELAND","PT":"PORTUGAL","GR":"GREECE","BE":"BELGIUM","QA":"QATAR","IL":"ISRAEL","IN":"INDIA","TH":"THAILAND","MY":"MALAYSIA","ID":"INDONESIA","PH":"PHILIPPINES","VN":"VIETNAM","TW":"TAIWAN","NZ":"NEW ZEALAND","ZA":"SOUTH AFRICA","EG":"EGYPT","KE":"KENYA","ET":"ETHIOPIA","RU":"RUSSIA","SA":"SAUDI ARABIA","CZ":"CZECHIA","MA":"MOROCCO","PL":"POLAND","HU":"HUNGARY","MT":"MALTA","PA":"PANAMA","RO":"ROMANIA","LV":"LATVIA","DZ":"ALGERIA","TN":"TUNISIA","JO":"JORDAN","KW":"KUWAIT","UZ":"UZBEKISTAN","LU":"LUXEMBOURG","CY":"CYPRUS","OM":"OMAN","RS":"SERBIA","PR":"PUERTO RICO","DO":"DOMINICAN REP.","VE":"VENEZUELA","LT":"LITHUANIA","KZ":"KAZAKHSTAN","LB":"LEBANON","IR":"IRAN","NG":"NIGERIA","HR":"CROATIA","BH":"BAHRAIN","LK":"SRI LANKA","BY":"BELARUS","CL":"CHILE","BG":"BULGARIA","BS":"BAHAMAS","AZ":"AZERBAIJAN","PK":"PAKISTAN","MO":"MACAU","CR":"COSTA RICA","PG":"PAPUA NEW GUINEA","BD":"BANGLADESH","IS":"ICELAND","SX":"SINT MAARTEN","AM":"ARMENIA","CU":"CUBA","NP":"NEPAL","PF":"FRENCH POLYNESIA","SV":"EL SALVADOR","TJ":"TAJIKISTAN","GH":"GHANA","JE":"JERSEY","JM":"JAMAICA","MV":"MALDIVES","MM":"MYANMAR","EE":"ESTONIA","MU":"MAURITIUS","EC":"ECUADOR","AW":"ARUBA","YE":"YEMEN","GE":"GEORGIA","FJ":"FIJI","AG":"ANTIGUA","SD":"SUDAN","MK":"NORTH MACEDONIA","TZ":"TANZANIA","SI":"SLOVENIA","CI":"IVORY COAST","CM":"CAMEROON","GT":"GUATEMALA","SB":"SOLOMON IS.","TC":"TURKS  CAICOS","TT":"TRINIDAD  TOBAGO","MG":"MADAGASCAR","VU":"VANUATU","BZ":"BELIZE","BJ":"BENIN","UG":"UGANDA","IQ":"IRAQ","CD":"DR CONGO","BB":"BARBADOS","CW":"CURACAO","KY":"CAYMAN IS.","GU":"GUAM","ZM":"ZAMBIA","VI":"US VIRGIN IS.","SK":"SLOVAKIA","AL":"ALBANIA","RW":"RWANDA","BO":"BOLIVIA","XK":"KOSOVO","LA":"LAOS","ML":"MALI","GA":"GABON","TG":"TOGO","CV":"CAPE VERDE","GG":"GUERNSEY","AF":"AFGHANISTAN","MZ":"MOZAMBIQUE","BF":"BURKINA FASO","HN":"HONDURAS","BN":"BRUNEI","ZW":"ZIMBABWE","CG":"CONGO","DJ":"DJIBOUTI","KG":"KYRGYZSTAN","HT":"HAITI","GP":"GUADELOUPE","RE":"REUNION","BA":"BOSNIA","NA":"NAMIBIA","LY":"LIBYA","SL":"SIERRA LEONE","UY":"URUGUAY","TD":"CHAD","ME":"MONTENEGRO","LC":"ST LUCIA","TM":"TURKMENISTAN","MQ":"MARTINIQUE","PY":"PARAGUAY","YT":"MAYOTTE","IM":"ISLE OF MAN","MP":"N. MARIANA IS.","ER":"ERITREA","DM":"DOMINICA","NC":"NEW CALEDONIA","GL":"GREENLAND","NE":"NIGER","MR":"MAURITANIA","CK":"COOK IS.","SC":"SEYCHELLES","GQ":"EQ. GUINEA","BM":"BERMUDA","GN":"GUINEA","BW":"BOTSWANA","GD":"GRENADA","SO":"SOMALIA","SS":"SOUTH SUDAN","NI":"NICARAGUA","GM":"GAMBIA","GY":"GUYANA","KM":"COMOROS","MW":"MALAWI","SR":"SURINAME","LR":"LIBERIA","BL":"SAINT BARTHELEMY","BQ":"BONAIRE","KN":"ST KITTS","PW":"PALAU","AO":"ANGOLA","WS":"SAMOA","VG":"BRITISH VIRGIN I","GI":"GIBRALTAR","GW":"GUINEA-BISSAU","BT":"BHUTAN","VC":"ST VINCENT","AI":"ANGUILLA","CF":"C. AFRICAN REP.","BI":"BURUNDI","GF":"FRENCH GUIANA","FO":"FAROE IS.","KP":"NORTH KOREA","MH":"MARSHALL IS.","TO":"TONGA","MN":"MONGOLIA","TL":"EAST TIMOR","EH":"WESTERN SAHARA D","PM":"SAINT PIERRE AND","NR":"NAURU","NF":"NORFOLK ISLAND","FM":"MICRONESIA","ST":"SAO TOME","KI":"KIRIBATI","WF":"WALLIS AND FUTUN","SN":"SENEGAL","FK":"FALKLAND IS.","MF":"SAINT MARTIN","CX":"CHRISTMAS ISLAND","CC":"COCOS KEELING IS","TV":"TUVALU","NU":"NIUE","KH":"CAMBODIA","LS":"LESOTHO","AS":"AMERICAN SAMOA","SY":"SYRIA","SH":"SAINT HELENA ASC","UM":"UNITED STATES MI","MS":"MONTSERRAT","MD":"MOLDOVA","SZ":"ESWATINI"},"core":["JFK0sUSNEW YORK\nLAX0gUSLOS ANGELES\nLHR1cGBLONDON\nCDG1gFRPARIS\nHND2cJPTOKYO\nDXB1sAEDUBAI\nSIN28SGSINGAPORE\nHKG28HKHONG KONG\nSFO0gUSSAN FRANCISCO\nORD0oUSCHICAGO\nAMS1gNLAMSTERDAM\nFRA1gDEFRANKFURT\nICN2cKRSEOUL\nPEK28CNBEIJING\nPVG28CNSHANGHAI\nSYD2kAUSYDNEY\nIST1oTRISTANBUL\nATL0sUSATLANTA\nDFW0oUSDALLAS-FORT WORTH\nMIA0sUSMIAMI\nSEA0gUSSEATTLE\nBOS0sUSBOSTON\nLAS0gUSLAS VEGAS\nDEN0kUSDENVER\nIAD0sUSWASHINGTON\nEWR0sUSNEWARK\nHNL08USHONOLULU\nYYZ0sCATORONTO\nYVR0gCAVANCOUVER\nMEX0oMXMEXICO CITY\nCUN0sMXCANCUN\nGRU10BRSAO PAULO\nEZE10ARBUENOS AIRES\nBOG0sCOBOGOTA\nLIM0sPELIMA\nMAD1gESMADRID\nBCN1gESBARCELONA\nFCO1gITROME\nMXP1gITMILANO\nMUC1gDEMUNICH\nZRH1gCHZURICH\nVIE1gATVIENNA\nCPH1gDKCOPENHAGEN\nARN1gSESTOCKHOLM\nOSL1gNOOSLO\nHEL1kFIHELSINKI\nDUB1cIEDUBLIN\nLIS1cPTLISBON\nATH1kGRATHENS\nBRU1gBEBRUSSELS\nDOH1oQADOHA\nAUH1sAEABU DHABI\nTLV1kILTEL-AVIV\nDEL1yINDELHI\nBOM1yINMUMBAI\nBKK24THBANGKOK\nKUL28MYKUALA LUMPUR\nCGK24IDJAKARTA\nMNL28PHMANILA\nSGN24VNHO CHI MINH CITY\nHAN24VNHANOI\nTPE28TWTAIPEI\nNRT2cJPTOKYO\nKIX2cJPOSAKA","CAN28CNGUANGZHOU\nSZX28CNSHENZHEN\nCTU28CNCHENGDU\nMEL2kAUMELBOURNE\nAKL2sNZAUCKLAND\nJNB1kZAJOHANNESBURG\nCPT1kZACAPE TOWN\nCAI1kEGCAIRO\nNBO1oKENAIROBI\nADD1oETADDIS ABABA\nSVO1oRUMOSCOW\nDME1oRUMOSCOW\nIAH0oUSHOUSTON\nLGW1cGBLONDON\nSTN1cGBLONDON\nMAN1cGBMANCHESTER\nDUS1gDEDUESSELDORF\nCLT0sUSCHARLOTTE\nDTW0sUSDETROIT\nMSP0oUSMINNEAPOLIS\nPMI1gESPALMA DE MALLORCA\nORY1gFRPARIS\nPHL0sUSPHILADELPHIA\nAGP1gESMALAGA\nLED1oRUST. PETERSBURG\nJED1oSAJEDDAH\nMCO0sUSORLANDO\nGVA1gCHGENEVA\nSAW1oTRISTANBUL\nFLL0sUSFORT LAUDERDALE\nALC1gESALICANTE\nYUL0sCAMONTREAL\nKMG28CNKUNMING\nPRG1gCZPRAGUE\nCGN1gDECOLOGNE\nCMN1gMACASABLANCA\nSLC0kUSSALT LAKE CITY\nDCA0sUSWASHINGTON\nPHX0kUSPHOENIX\nNCE1gFRNICE\nCKG28CNCHONGQING\nEDI1cGBEDINBURGH\nHAM1gDEHAMBURG\nMRS1gFRMARSEILLE\nXIY28CNXI'AN\nLTN1cGBLONDON\nTFS1cESTENERIFE\nCRL1gBEBRUSSELS CHARLEROI\nLPA1cESGRAN CANARIA\nBHX1cGBBIRMINGHAM\nRUH1oSARIYADH\nSTR1gDESTUTTGART\nBGY1gITBERGAMO\nSHJ1sAESHARJAH\nLYS1gFRLYON\nWAW1gPLWARSAW\nBUD1gHUBUDAPEST\nMLA1gMTMALTA\nMDW0oUSCHICAGO\nVKO1oRUMOSCOW\nBRS1cGBBRISTOL\nVCE1gITVENICE\nBWI0sUSBALTIMORE\nHGH28CNHANGZHOU","PTY0sPAPANAMA CITY\nXMN28CNXIAMEN\nCSX28CNCHANGCHA\nLGA0sUSNEW YORK\nSHA28CNSHANGHAI\nTPA0sUSTAMPA\nOTP1kROBUCHAREST\nRIX1kLVRIGA\nALG1gDZALGIER\nSVX1wRUYEKATERINBURG\nBSL1gFRMULHOUSE\nWUH28CNWUHAN\nAYT1oTRANTALYA\nPSA1gITPISA\nBLQ1gITBOLOGNA\nFAO1cPTFARO\nEIN1gNLEINDHOVEN\nGLA1cGBGLASGOW\nHER1kGRHERAKLION\nSHE28CNSHENYANG\nBNE2gAUBRISBANE\nOPO1cPTPORTO\nSTL0oUSST. LOUIS\nTUN1gTNTUNIS\nYYC0kCACALGARY\nBVA1gFRPARIS BEAUVAIS\nDLC28CNDALIAN\nIBZ1gESIBIZA\nAMM1oJOAMMAN\nHRB28CNHARBIN\nKWI1oKWKUWAIT\nPDX0gUSPORTLAND\nACE1cESARRECIFE\nEMA1cGBEAST MIDLANDS\nSAN0gUSSAN DIEGO\nTAS1wUZTASHKENT\nVLC1gESVALENCIA\nCLE0sUSCLEVELAND\nLUX1gLULUXEMBURG\nNTE1gFRNANTES\nCGO28CNZHENGZHOU\nFUE1cESFUERTEVENTURA\nLCA1kCYLARNACA\nMCT1sOMMUSCAT\nSKG1kGRTHESSALONIKI\nURC28CNURUMQI\nNKG28CNNANJING\nTAO28CNQINGDAO\nOVB24RUNOVOSIBIRSK\nBEG1gRSBELGRADE\nKRK1gPLKRAKOW\nTSN28CNTIANJIN\nHAJ1gDEHANNOVER\nLBA1cGBLEEDS\nNAP1gITNAPLES\nRHO1kGRRHODOS\nVCP10BRCAMPINAS\nCIA1gITROME\nCTA1gITCATANIA\nGIG10BRRIO DE JANEIRO\nGRO1gESGERONA\nSFB0sUSSANFORD\nBGO1gNOBERGEN\nBOD1gFRBORDEAUX","HOU0oUSHOUSTON\nNCL1cGBNEWCASTLE\nRAK1gMAMARRAKECH\nSJU0wPRSAN JUAN\nDMK24THBANGKOK\nDMM1oSADAMMAM\nKWE28CNGUIYANG\nLPL1cGBLIVERPOOL\nPUJ0wDOPUNTA CANA\nBNA0oUSNASHVILLE\nCCS0wVECARACAS\nCVG0sUSCINCINNATI\nFOC28CNFUZHOU\nGDN1gPLGDANSK\nHHN1gDEFRANKFURT HAHN\nTLS1gFRTOULOUSE\nTYN28CNTAIYUAN\nVNO1kLTVILNIUS\nADB1oTRIZMIR\nALA1wKZALMA-ATA\nBEY1kLBBEIRUT\nBSB10BRBRASILIA\nESB1oTRANKARA\nAEP10ARBUENOS AIRES\nIKA1qIRTEHRAN\nLOS1gNGLAGOS\nNNG28CNNANNING\nBRE1gDEBREMEN\nMCI0oUSKANSAS CITY\nMED1oSAMADINAH\nNGO2cJPNAGOYA\nAUS0oUSAUSTIN\nDBV1gHRDUBROVNIK\nDPS28IDBALI\nBAH1oBHBAHRAIN\nBLR1yINBANGALORE\nBRI1gITBARI\nCMB1yLKCOLOMBO\nDWC1sAEDUBAI\nGDL0oMXGUADALAJARA\nKWL28CNGUILIN\nMSQ1oBYMINSK 2\nSCL10CLSANTIAGO\nSOF1kBGSOFIA\nSYX28CNSANYA\nTNA28CNJINAN\nMAA1yINMADRAS\nMHD1qIRMASHHAD\nNAS0sBSNASSAU\nBLL1gDKBILLUND\nCFU1kGRKERKYRA\nCHQ1kGRCHANIA\nGYD1sAZBAKU\nMSY0oUSNEW ORLEANS\nPMO1gITPALERMO\nRDU0sUSRALEIGH-DURHAM\nCAG1gITCAGLIARI\nHAK28CNHAIKOU\nISB1wPKISLAMABAD\nKHN28CNNANCHANG\nMFM28MOMACAU\nNGB28CNNINBO\nNRN1gDEWEEZE\nPER28AUPERTH","SJO0oCRSAN JOSE\nSVQ1gESSEVILLA\nTHR1qIRTEHERAN\nTSF1gITTREVISO\nYEG0kCAEDMONTON\nCCU1yINKOLKATA\nCTS2cJPSAPPORO\nFUK2cJPFUKUOKA\nHET28CNHOHHOT\nKHH28TWKAOHSIUNG\nKHI1wPKKARACHI\nPIT0sUSPITTSBURGH\nSPU1gHRSPLIT\nSVG1gNOSTAVANGER\nLCY1cGBLONDON\nPUS2cKRBUSAN\nBIO1gESBILBAO\nCNF10BRBELO HORIZONTE\nHFE28CNHEFEI\nIND0sUSINDIANAPOLIS\nKRR1oRUKRASNODAR\nOAK0gUSOAKLAND\nPOM2gPGPORT MORESBY\nSAT0oUSSAN ANTONIO\nSJW28CNSHIJIAZHUANG\nANC0cUSANCHORAGE\nDAC20BDDHAKA\nKEF1cISKEFLAVIK\nLHE1wPKLAHORE\nSXM0wSXPHILIPSBURG\nCJU2cKRCHEJU\nCMH0sUSCOLUMBUS\nEVN1sAMYEREVAN\nHAV0sCUHAVANA\nLHW28CNLANZHOU\nLIN1gITMILAN\nOLB1gITOLBIA\nRSW0sUSFORT MYERS\nWNZ28CNWENZHOU\nYHZ0wCAHALIFAX\nAZA0kUSMESA\nGOT1gSEGOTHENBORG\nHKT24THPHUKET\nHYD1yINHYDERABAD\nKTM1zNPKATHMANDU\nLIL1gFRLILLE\nMEM0oUSMEMPHIS\nMTY0oMXMONTERREY\nNUE1gDENUERNBERG\nOKA2cJPOKINAWA\nPPT08PFPAPEETE\nSAL0oSVSAN SALVADOR\nTIJ0gMXTIJUANA\nAHO1gITALGHERO\nDYU1wTJDUSHANBE\nKJA24RUKRASNOYARSK\nNYO1gSESTOCKHOLM SKAVSTA\nPIE0sUSST. PETERSBURG\nTRD1gNOTRONDHEIM\nWRO1gPLWROCLAW\nACC1cGHACCRA\nBKI28MYKOTA KINABALU\nCNS2gAUCAIRNS\nFNC1cPTFUNCHAL","INC28CNYINCHUAN\nJER1cJEJERSEY\nKGS1kGRKOS\nMKE0oUSMILWAUKEE\nORK1cIECORK\nRTM1gNLROTTERDAM\nSDQ0wDOSANTO DOMINGO\nSJC0gUSSAN JOSE\nSSA10BRSALVADOR\nTRF1gNOSANDEFJORD\nZUH28CNZHUHAI\nABZ1cGBABERDEEN\nBET0cUSBETHEL\nBFS1cGBBELFAST\nCEB28PHCEBU\nCGQ28CNCHANGCHUN\nDLM1oTRDALAMAN\nDTM1gDEDORTMUND\nMBJ0sJMMONTEGO BAY\nMLE1wMVMALE\nPOA10BRPORTO ALEGRE\nRGN22MMYANGON\nSMF0gUSSACRAMENTO\nTRN1gITTORINO\nIKT28RUIRKUTSK\nLEJ1gDELEIPZIG\nLJG28CNLIJIANG\nNBE1gTNENFIDHA\nTLL1kEETALLINN-ULEMISTE INT\nTPS1gITTRAPANI\nZAG1gHRZAGREB\nKTW1gPLKATOWICE\nMRU1sMUPLAISANCE\nSYZ1qIRSHIRAZ\nADL2iAUADELAIDE\nAJA1gFRAJACCIO\nBDL0sUSWINDSOR LOCKS\nCGH10BRSAO PAULO\nCNX24THCHIANG MAI\nFLR1gITFLORENCE\nHRG1kEGHURGHADA\nJAX0sUSJACKSONVILLE\nMAH1gESMENORCA\nSNN1cIESHANNON\nSUB24IDSURABAYA\nSXB1gFRSTRASBOURG\nUIO0sECQUITO\nUPG28IDUJUNG PANDANG\nWMI1gPLWARSAW\nYOW0sCAOTTAWA\nABV1gNGABUJA\nAUA0wAWORANJESTAD\nDJE1gTNDJERBA\nPFO1kCYPAPHOS\nSAH1oYESANAA\nTBS1sGETBILISI\nCWB10BRCURITIBA\nDAL0oUSDALLAS\nFAI0cUSFAIRBANKS\nNAN2oFJNANDI\nORN1gDZORAN\nSWA28CNSHANTOU\nZAD1gHRZADAR\nABQ0kUSALBUQUERQUE","ANU0wAGANTIGUA\nBIA1gFRBASTIA\nKHV2gRUKHABAROVSK\nKRT1kSDKHARTOUM\nMYR0sUSMYRTLE BEACH\nRMQ28TWTAICHUNG\nSDF0sUSLOUISVILLE\nSKP1gMKSKOPJE\nSOU1cGBSOUTHAMPTON\nVRN1gITVILLAFRANCA\nYKS2cRUYAKUTSK\nYNT28CNYANTAI\nYWG0oCAWINNIPEG\nAGA1gMAAGADIR\nCOK1yINKOCHI\nDAR1oTZDAR ES SALAAM\nITM2cJPOSAKA\nLJU1gSILJUBLJANA\nOKC0oUSOKLAHOMA CITY\nSCQ1gESSANTIAGO\nSJD0kMXSAN JOSE DEL CABO\nSNA0gUSSANTA ANA\nSUF1gITLAMEZIA\nABJ1cCIABIDJAN\nBJV1oTRBODRUM\nCHC2sNZCHRISTCHURCH\nCWL1cGBCARDIFF\nDLA1gCMDOUALA\nFMM1gDEMEMMINGEN\nGUA0oGTGUATEMALA CITY\nHBE1kEGALEXANDRIA\nHIR2kSBHONIARA\nKZN1oRUKAZAN\nOGG08USKAHULUI\nPIK1cGBPRESTWICK\nPLS0sTCPROVIDENCIALES\nPOS0wTTPORT-OF-SPAIN\nPVR0oMXPUERTO VALLARTA\nSZG1gATSALZBURG\nTNR1oMGANTANANARIVO\nVLI2kVUPORT-VILA\nWLG2sNZWELLINGTON\nBHM0oUSBIRMINGHAM\nBUF0sUSBUFFALO\nBZE0oBZBELIZE CITY\nCHS0sUSCHARLESTON\nCOO1gBJCOTONOU\nDAD24VNDANANG\nDRW2eAUDARWIN\nEBB1oUGENTEBBE\nEBL1oIQERBIL\nFIH1gCDKINSHASA\nGRR0sUSGRAND RAPIDS\nGSP0sUSGREENVILLE\nKUF1sRUSAMARA\nMPL1gFRMONTPELLIER\nMYY28MYMIRI\nOMA0oUSOMAHA\nPEN28MYPENANG\nTOS1gNOTROMSO\nYQB0sCAQUEBEC\nALB0sUSALBANY\nBDS1gITBRINDISI\nBEL10BRBELEM","BGI0wBBBRIDGETOWN\nCUR0wCWWILLEMSTAD\nDSN28CNDONGSHENG\nEXT1cGBEXETER\nFOR10BRFORTALEZA\nGCM0sKYGEORGETOWN\nGUM2gGUAGANA\nGYE0sECGUAYAQUIL\nKIN0sJMKINGSTON\nKUN1kLTKAUNAS\nLBD1wTJKHUDZHAND\nLUN1kZMLUSAKA\nORF0sUSNORFOLK\nPOZ1gPLPOZNAN\nPVD0sUSPROVIDENCE\nRIC0sUSRICHMOND\nSSH1kEGSHARM EL SHEIKH\nSTT0wVIST. THOMAS\nTJM1wRUTYUMEN\nTSA28TWTAIPEI\nUFA1wRUUFA\nWUX28CNWUXI\nXNN28CNXINING\nADE1oYEADEN\nAER1oRUSOCHI\nAMD1yINAHMEDABAD\nBHD1cGBBELFAST\nBTS1gSKBRATISLAVA\nCCJ1yINCALICUT\nCGB0wBRCUIABA\nCLJ1kROCLUJ-NAPOCA\nCLO0sCOCALI\nCZX28CNCHANGZHOU\nDRS1gDEDRESDEN\nFKB1gDEKARLSRUHE\nJJN28CNQUANZHOU\nMAO0wBRMANAUS\nMDE0sCORIO NEGRO\nPGD0sUSPUNTA GORDA\nREC10BRRECIFE\nROC0sUSROCHESTER\nSDU10BRRIO DE JANEIRO\nTIA1gALTIRANA\nTUL0oUSTULSA\nTXN28CNHUANGSHAN\nXUZ28CNXUZHOU\nYCU28CNYUNCHENG\nYXL0oCASIOUX LOOKOUT\nYZF0kCAYELLOWKNIFE\nBAV28CNBAOTOU\nBOH1cGBBOURNEMOUTH\nBTH24IDBATAM\nDSM0oUSDES MOINES\nGOA1gITGENOA\nKGL1kRWKIGALI\nLIT0oUSLITTLE ROCK\nLPB0wBOLA PAZ\nPDL18PTPONTA DELGADA\nPEW1wPKPESHAWAR\nPRN1gXKPRISTINA\nPSP0gUSPALM SPRINGS\nSCO1wKZAKTAU\nSDR1gESSANTANDER\nTFN1cESTENERIFE"],"coreGeo":"Zh/On{>q/Kjbm_Pjt~o0RCse4Ji2khh^s9d\\Et}\\R+?hwvbN=P28m*R:.oojm&SBuHn7UHt:;?nEl}A9pOn\\<:rMhl/WcH7@o@a\\oCTe*tjOL<*`i~W~(3e%@E6dru\\)0rp#A5/Cl+H(.pnOXj.*mwZR/Ln~)>@uafV~0<pj@U7psnJ2&2`?SB&/aRn)2H>ddd0l6f]S$vTj[&%0GJswNnnssTR:oDrRX<o`plUtqtnxW9sEoiU\\runKYis9jCVcv|g.X1xcgKUHxwe_Z[x|l9N$uztHK?mnr2_fm=mxS<tcjpqZd^i8s1d&q#g?iFZ%xFf~]mzU`'H`|w[tGa}~S6Cu|nL+:(w2\\SD(|=Y]E@z;a_;Gt]dQ4:hlku6(kek$@?wjc;?swqbdGMwLhG38e|4u,JTB5?uFdU<gu1]37>r|efh*uil]OztImNX3eL`]w/e[a'vsM>)Ag~mrPvtomGQ.u5lKOwuvmWTGtuVw+ukSTz/2ovO20MqMtJRcn>o@R:sXY~.rnPukN-lOd~\\`xir0k~a~W-)$fvp]TGr7o@b%o.X)(>e7u-P_mQZ&2&qlGayZdSmZX<t>mmT[tbw*Kxj?C|0do(Y&.+mrB\\-IjCr$U4piEVw<gmjdOPw-ksUfv'r;T&p]Dltxk%mHPnu4wwEJf]n5S<tOx4F7fUm%P0uNmZoCdIn}UssVpbVJqvhUs<dap~SqqykC[,uAnF[;rtu,ZAkyRC.fo_eb`gv{maO^tzpPWuqnY7.?n(<ss<h2YE$CX:=<uvd-A$v;ffZa/To'<Ur[hoV=(efXnJ_Iq=gz[5wUuoS)lP]?g%wNohU)r|@lu'hTpZcpl\\qeW#pjq1WJq;uEKvlcmUSbt}jfO#w*r{`|k[>&maoW,WcN;ps4KkoAPj-/mlu8WTlYE:6\\tmntR,s{>>oOmxtmQrmsp`h#i4=}jzqtktnngM?_5tqrx.GTg;lkPDu_?@.Xis]9qCoBtQPdn:Uu.qoJn\\T8t'p<P.rfAas`k*x;G?fwpJevk?g2trcIq5^^nuRMr-pv>-s;i5>Jq(l<TGk1vboZ\\AqJlkZ~t=@[pcn%l]UeuOl-P7v1rcYYo-q`bKl?mm1|?%rNXOo`t:ZPl}ot3z?2s5R_ofW0)1g0gdS*x{q\\PZqKMA)5ghkCP7vcwlKSi-bh)/_VHk|u\\)kXpLeQE,xGeVlKO]uva*(N__S1+vl.ba'FYNT@-Km}<Stze-jIYPvGnDTgt6r=QlpgC$rXm2i*\\EvRq.aOmQXQqZpXp.g4jZn_02DJnQd1n_dp0f6vhRn5k_~\\S_V<ChyCbalAU8uiN*-Sn0q4kfd.5Ojpk>Kc)Zh0q3[\\p-=`z1J#k2pueDZT|i[Qr3Z~o;Y$}yVhhps:dEG+'*a/Bgx,dZhx]gv2]],f7bp%^Kp5BPz4_L@2qflYX_}2[Bchq%l5Z'(@dNjWU.w%rA]*nAs2`@kfgNkonrPn)2h#t7Y5mKX:,Kk{t3V[n-AtyR`b\\@u]jJ?Hu9g6?zx'bC<3s'gtmIT(u(?wt,8`UX#xX}uBM:lzhCn2kppKWlquF#7nuuR1{Kbe6Qeyp980n2jLD/qUnr;Uu_b`a5wLdEVy.Snsq$ZDpbh`SBxFm]Q&u#9En:kQrKO?pUp42xAU??sjiES=-cnGj5eTqU=Z27m0*qiWIMK-)IgaAwqmmQ=lEwy?Pd{*cZc]I:zB[Uvji(dk)~_::5opjHUD.&nWj.iZn`VZ'%b|H>tylEpqV6qks>Vho.Vv(<eV<1sufT_U3oqMBn-<j;i'V8wsJI~)WPYn|'^]T>yZfFn3RXtTQ$+BkIIf(7e#n@Vgs}7lqbe?+3:nC/Qg$<[c?I.KigsUV&n{^#rUm`OujYw7gmWyxCV3(bfTe4Tuz1l^YGtm~kPsUP<vz-Uh,\\ijC^v)EoiqFns\\mSo&OqsoqlajlVR9/CpBm-Lmu3m;S5u8`2(*_U=`1|lwt355Ffh4U5xR@*x1b9ivP'w`;`J#y0kMN.vS7dvTY8=cktp{q@bilQmETlu$Z/&C_Z^$|~TDi}1|:#L>|i^F>52Imiq.U@q^J#l<uFm&W*t{IbyLe_uWWgl+f9ZoxZtKXqm;oqYtqzl`ZWtOh'uK@zi@plga4hi|6_roV9og[40Bogmx2C>WJ7|%_mqWWLpqs$gif$Vf)khBt7SZnOlTLauZ?A{(K+o4U'sNZ=#zPv:HxrLyk8ZuuNY$1`qd~)VgX6`C&lZ{vSX0j^pue?k5pjow]<i@i=oYl01Y=3LG*]iz@JFYz]%9R{B|vGPZkl>4vgcFprYhq$F9,wkIek*;^VrJVYp-;GfNsNvChp]DXC+KjR;^u+cvSb,ymJpm][ohm|P@tfpeW,qhC8aUy_>;p7m-M<3[t5x3JRh8[^}$Y-tGmsKQ6*kRk9onXzr7L'+ok^rBL)p@Bf)4c+?-/2jRsE[$mu~cMrU7qKb#lq/wUB1Bm_OAtz~8XhT7o>VNs3PY$P\\Ys<dUh^&C`OINa{dcv{)[?naHj|Nxvw^$(@b)fb)AYMEa'Oa:o-W{s*nKq,B3&+YsC$.ZT/2\\S3*fjKWX/}pBR>%2^rWb*{i}~aRvV,C5{#]e3Zr|G-wniaQ&kejhl5}6]7MOS]/Gp?V-+\\k@bSf$u}r:S?pd>CzwTNMM.]oDHo~)U:`-V3|0['31rTZJ0Wp8r5[hn|oP.XOugh*G[Ha0'&ZeDzrGn;n)O;t[tv4HM|WS&*`5,Ljk[fY*#hO<[#&G_2i-[kv`]4qzncx#f0DpYj-<l\\kqY.uM[y0Mo\\Y$-Hm$rSgzfXcN)K_N[Ig_w_;5tRdP_|g+vO=/rni&I>u1lFpcpf[7jZfLp]]]yGc&kQN<vQn?Z*s<[{|kYtic,8DYmq]_rS[n$FSq=[ruiAm&Wstno$U;sZ=%u`d>gy)5NW\\R$gUyVe(FeovB6yJQX305pLov4$?,qO\\^oJM5,*l2>+t4gn?ErkjiCQt.kMP%3St>H5=^ylE(qpnwn)P)t^Ek}ZQvNm.^oQqNV(q5xih+OJOT+8k6aG((CxqkA8m1]+u3jep\\]2p.?z.mj[epjmpsrBNjp\\wlE\\fy","sizes":[["g0.txt",3600],["g1.txt",3600],["g2.txt",3600],["g3.txt",3600],["g4.txt",3600],["g5.txt",1464],["a8.txt",1041],["a9.txt",1063],["a10.txt",1034],["a11.txt",1008],["a12.txt",1030],["a13.txt",1006],["a14.txt",1041],["a15.txt",1049],["a16.txt",1053],["a17.txt",1005],["a18.txt",1083],["a19.txt",1040],["a20.txt",1015],["a21.txt",1109],["a22.txt",1031],["a23.txt",1033],["a24.txt",1026],["a25.txt",1021],["a26.txt",1046],["a27.txt",1056],["a28.txt",1049],["a29.txt",1061],["a30.txt",1041],["a31.txt",1066],["a32.txt",1048],["a33.txt",1081],["a34.txt",1088],["a35.txt",1063],["a36.txt",1017],["a37.txt",979],["a38.txt",1004],["a39.txt",1105],["a40.txt",1094],["a41.txt",1021],["a42.txt",1044],["a43.txt",1004],["a44.txt",995],["a45.txt",1014],["a46.txt",1072],["a47.txt",1076],["a48.txt",1041],["a49.txt",1045],["a50.txt",754],["lA.txt",975],["lB.txt",1165],["lC.txt",1060],["lD.txt",560],["lE.txt",415],["lF.txt",360],["lG.txt",650],["lH.txt",660],["lI.txt",540],["lJ.txt",360],["lK.txt",835],["lL.txt",790],["lM.txt",1130],["lN.txt",530],["lO.txt",450],["lP.txt",955],["lQ.txt",40],["lR.txt",545],["lS.txt",1145],["lT.txt",965],["lU.txt",340],["lV.txt",395],["lW.txt",260],["lX.txt",120],["lY.txt",800],["lZ.txt",175]],"apUrl":"https://raw.githubusercontent.com/windAGH/busybar-apps/500ae6515c964ef5c21de3809c1c8c91dc1553f5/flight/airports/82ad9606/","tap":1800,"takeoff":8500,"opening":1400,"landing":10000,"chime":3100,"scan":733,"tiny":{"0":["111","101","101","101","111"],"1":["010","110","010","010","111"],"2":["111","001","111","100","111"],"3":["111","001","011","001","111"],"4":["101","101","111","001","001"],"5":["111","100","111","001","111"],"6":["111","100","111","101","111"],"7":["111","001","010","010","010"],"8":["111","101","111","101","111"],"9":["111","101","111","001","111"],"H":["101","101","111","101","101"],"M":["101","111","111","101","101"],"A":["010","101","111","101","101"],"B":["110","101","110","101","110"],"C":["011","100","100","100","011"],"D":["110","101","101","101","110"],"E":["111","100","110","100","111"],"F":["111","100","110","100","100"]," ":["000","000","000","000","000"]},"roll":150,"wing":{"d":"! XPM2\n26 9 3 1\n. c none\na c #E2E6EE\nb c #B0B8C8\n...a......................\n...ba.....................\n...bbaaa..................\n.....bbbaaaa..............\n.......bbbbbaaaa..........\n.........bbbbbbbaaaa......\n...........bbbbbbbbbaaaa..\n..............bbbbbbbbbbaa\n..................bbbbbbbb","g":"! XPM2\n26 9 3 1\n. c none\na c #C49696\nb c #785464\n...a......................\n...ba.....................\n...bbaaa..................\n.....bbbaaaa..............\n.......bbbbbaaaa..........\n.........bbbbbbbaaaa......\n...........bbbbbbbbbaaaa..\n..............bbbbbbbbbbaa\n..................bbbbbbbb","n":"! XPM2\n26 9 3 1\n. c none\na c #5C668A\nb c #323A5A\n...a......................\n...ba.....................\n...bbaaa..................\n.....bbbaaaa..............\n.......bbbbbaaaa..........\n.........bbbbbbbaaaa......\n...........bbbbbbbbbaaaa..\n..............bbbbbbbbbbaa\n..................bbbbbbbb"},"stars":["! XPM2\n72 9 3 1\n. c none\na c #ECF0FF\nb c #6E78A0\n............b...........................................................\n.....................................................b......b...........\n........a...............................................a...............\n.............b.....b................................a...................\n..ba.a.....................a......b....................b....b...........\n....................a............................b......................\n.....a..a........................................b................a.....\n........................b.........b..........................b........b.\n..............................b.........................................","! XPM2\n72 9 3 1\n. c none\na c #ECF0FF\nb c #6E78A0\n............b...........................................................\n.....................................................b......b...........\n........a...............................................a...............\n.............b.....a................................a...................\n..ba.a.....................a......a....................b....b...........\n....................a............................a......................\n.....b..a........................................a................a.....\n........................b.........b..........................b........b.\n..............................a........................................."],"mono":{"A":["011110","110011","110011","111111","110011","110011","110011"],"B":["111110","110011","110011","111110","110011","110011","111110"],"C":["011110","110011","110000","110000","110000","110011","011110"],"D":["111110","110011","110011","110011","110011","110011","111110"],"E":["111111","110000","110000","111110","110000","110000","111111"],"F":["111111","110000","110000","111110","110000","110000","110000"],"G":["011110","110011","110000","111111","110011","110011","011110"],"H":["110011","110011","110011","111111","110011","110011","110011"],"I":["011110","001100","001100","001100","001100","001100","011110"],"J":["001111","000110","000110","000110","000110","110110","011100"],"K":["110011","110110","111100","111000","111100","110110","110011"],"L":["110000","110000","110000","110000","110000","110000","111111"],"M":["110011","111111","111111","110011","110011","110011","110011"],"N":["110011","111011","111111","110111","110011","110011","110011"],"O":["011110","110011","110011","110011","110011","110011","011110"],"P":["111110","110011","110011","111110","110000","110000","110000"],"Q":["011110","110011","110011","110011","111111","110110","011111"],"R":["111110","110011","110011","111110","111100","110110","110011"],"S":["011111","110000","110000","011110","000011","000011","111110"],"T":["111111","001100","001100","001100","001100","001100","001100"],"U":["110011","110011","110011","110011","110011","110011","011110"],"V":["110011","110011","110011","110011","110011","011110","001100"],"W":["110011","110011","110011","110011","111111","111111","110011"],"X":["110011","110011","011110","001100","011110","110011","110011"],"Y":["110011","110011","011110","001100","001100","001100","001100"],"Z":["111111","000011","000110","001100","011000","110000","111111"],"0":["011110","110011","110111","111111","111011","110011","011110"],"1":["001100","011100","001100","001100","001100","001100","011110"],"2":["011110","110011","000011","000110","001100","011000","111111"],"3":["111110","000011","000011","011110","000011","000011","111110"],"4":["000110","001110","011110","110110","111111","000110","000110"],"5":["111111","110000","111110","000011","000011","110011","011110"],"6":["001110","011000","110000","111110","110011","110011","011110"],"7":["111111","000011","000110","001100","011000","011000","011000"],"8":["011110","110011","110011","011110","110011","110011","011110"],"9":["011110","110011","110011","011111","000011","000110","011100"]},"egg":[{"d":["! XPM2\n15 7 10 1\n. c none\nS c #E0E4EC\nc c #60CCF2\nd c #307AAC\ng c #78FFBE\nh c #D7F8FF\nk c #585E70\no c #FF8C3C\ns c #9CA2B2\ny c #FFE260\n......hhh......\n.....hcccc.....\n....dccccccd...\n..SSSSSSSSSSS..\nssyssossyssosss\n.kkkkkkkkkkkkk.\n....g.....g....","! XPM2\n15 7 10 1\n. c none\nS c #E0E4EC\nc c #60CCF2\nd c #307AAC\ng c #78FFBE\nh c #D7F8FF\nk c #585E70\no c #FF8C3C\ns c #9CA2B2\ny c #FFE260\n......hhh......\n.....hcccc.....\n....dccccccd...\n..SSSSSSSSSSS..\nssossyssossysss\n.kkkkkkkkkkkkk.\n.......g......."],"w":15,"h":7,"at":"any"},{"d":["! XPM2\n9 11 10 1\n. c none\nB c #744A26\nR c #FF8068\nY c #FFE278\nb c #B07840\nk c #6E5C4A\nm c #A02422\no c #FFAA3C\nr c #DE3E34\ny c #E8AA38\n..rRYyr..\n.rRRYYym.\nrrRRYYymm\nrrRRYYymm\nrrRRYYymm\n.rRRYYym.\n..rRYym..\n...k.k...\n...kok...\n...bbb...\n...BBB...","! XPM2\n9 11 10 1\n. c none\nB c #744A26\nR c #FF8068\nY c #FFE278\nb c #B07840\nk c #6E5C4A\nm c #A02422\no c #FFAA3C\nr c #DE3E34\ny c #E8AA38\n..rRYyr..\n.rRRYYym.\nrrRRYYymm\nrrRRYYymm\nrrRRYYymm\n.rRRYYym.\n..rRYym..\n...kok...\n...k.k...\n...bbb...\n...BBB..."],"w":9,"h":11,"at":"day"},{"d":["! XPM2\n5 9 6 1\n. c none\nR c #FF6E6E\nW c #FFDCDC\nd c #961A28\nr c #E43440\nw c #D6D6DC\n.rRr.\nrRWRr\nrRRrd\nrrrdd\n.rdd.\n..d..\n..w..\n.w...\n..w..","! XPM2\n5 9 6 1\n. c none\nR c #FF6E6E\nW c #FFDCDC\nd c #961A28\nr c #E43440\nw c #D6D6DC\n.rRr.\nrRWRr\nrRRrd\nrrrdd\n.rdd.\n..d..\n..w..\n...w.\n..w.."],"w":5,"h":9,"at":"day"},{"d":["! XPM2\n7 9 12 1\n. c none\nB c #6EA0FF\nG c #606678\nR c #FF6054\nb c #3868D6\nf c #FFD6B0\ng c #969CAC\nk c #3C2C22\no c #FF962C\nr c #D62C2C\nw c #F6F6F6\ny c #FFE86E\n..rR...\n.rRrr..\nrrrrrr.\n.fff...\ngwwww..\ngbBbb..\nGbbbb..\no.k.k..\ny......","! XPM2\n7 9 11 1\n. c none\nB c #6EA0FF\nG c #606678\nR c #FF6054\nb c #3868D6\nf c #FFD6B0\ng c #969CAC\nk c #3C2C22\nr c #D62C2C\nw c #F6F6F6\ny c #FFE86E\n..rR...\n.rRrr..\nrrrrrr.\n.fff...\ngwwww..\ngbBbb..\nGbbbb..\ny.k.k..\n......."],"w":7,"h":9,"at":"any"},{"d":["! XPM2\n9 5 4 1\n. c none\nW c #FFFFFF\ng c #9CA4B8\nw c #E0E4EE\nW........\nwWWw.....\n.gwWWWww.\n..gww....\n...g.....","! XPM2\n9 5 4 1\n. c none\nW c #FFFFFF\ng c #9CA4B8\nw c #E0E4EE\nW........\nwWWw.....\n.gwWWWww.\n..gww....\n...g....."],"w":9,"h":5,"at":"day"},{"d":["! XPM2\n11 8 9 1\n. c none\nB c #704824\nP c #BE82F0\nY c #FFF4B4\nb c #AA743C\nd c #543080\nf c #AAE28C\np c #8C54C4\ny c #FFD660\n...p.......\n..pPp......\n.pPppd.....\n..fpd......\n..ppd....yy\nbbbBbbbbbyY\n...pd....yy\n...........","! XPM2\n11 8 9 1\n. c none\nB c #704824\nP c #BE82F0\nY c #FFF4B4\nb c #AA743C\nd c #543080\nf c #AAE28C\np c #8C54C4\ny c #FFD660\n...p.......\n..pPp......\n.pPppd.....\n..fpd......\n..ppd....yY\nbbbBbbbbbyy\n...pd....yy\n..........Y"],"w":11,"h":8,"at":"night"},{"d":["! XPM2\n11 4 2 1\n. c none\nw c #FAFAFF\nw.w....w.w.\n.w..w.w.w..\n.....w.....\n...........","! XPM2\n11 4 3 1\n. c none\ng c #B0BACE\nw c #FAFAFF\n...........\nwgw....wgw.\n....wgw....\n..........."],"w":11,"h":4,"at":"day"},{"d":["! XPM2\n14 8 7 1\n. c none\nB c #76B0FC\nb c #3E7AE0\nd c #244EA4\nl c #C4DAFC\ns c #CEEAFF\nw c #FFFFFF\n.......s.s....\n........s.....\n...BBBBBB....b\n..BbbbbbbbB.bb\n.bbwbbbbbbbbbb\n.bbbbbbbbbbb.b\n..lllllllll...\n....dd........","! XPM2\n14 8 7 1\n. c none\nB c #76B0FC\nb c #3E7AE0\nd c #244EA4\nl c #C4DAFC\ns c #CEEAFF\nw c #FFFFFF\n......s...s...\n.......s.s....\n...BBBBBB....b\n..BbbbbbbbB.bb\n.bbwbbbbbbbbbb\n.bbbbbbbbbbb.b\n..lllllllll...\n....dd........"],"w":14,"h":8,"at":"any"},{"d":["! XPM2\n16 6 8 1\n. c none\nR c #FF685C\nd c #B07440\nf c #FFD6B0\nk c #6E5C4A\nr c #DE2C2C\nw c #FFFFFF\ny c #FFD660\n.d.d......w.....\n.ddd.....rr.....\ndddd....rRf.....\n.ddkkkkkrrrrr...\n.d.d...yrrrry...\n........yyyyy...","! XPM2\n16 6 8 1\n. c none\nR c #FF685C\nd c #B07440\nf c #FFD6B0\nk c #6E5C4A\nr c #DE2C2C\nw c #FFFFFF\ny c #FFD660\n.d.d......w.....\n.ddd.....rr.....\ndddd....rRf.....\n.ddkkkkkrrrrr...\nd...d..yrrrry...\n........yyyyy..."],"w":16,"h":6,"at":"dec"}],"small":{"A":4,"B":4,"C":4,"D":4,"E":4,"F":4,"G":4,"H":4,"I":1,"J":3,"K":4,"L":3,"M":5,"N":4,"O":4,"P":4,"Q":4,"R":4,"S":4,"T":3,"U":4,"V":3,"W":5,"X":3,"Y":3,"Z":3,"a":3,"b":3,"c":3,"d":3,"e":3,"f":2,"g":3,"h":3,"i":1,"j":2,"k":3,"l":1,"m":5,"n":3,"o":3,"p":3,"q":3,"r":2,"s":3,"t":2,"u":3,"v":3,"w":5,"x":3,"y":3,"z":3,"0":3,"1":2,"2":3,"3":3,"4":3,"5":3,"6":3,"7":3,"8":3,"9":3,",":1,":":1,".":1,"%":4,"/":2,"-":2,"+":3," ":1,"&":4},"smallGap":1,"xl":{"0":7,"1":4,"2":7,"3":7,"4":7,"5":7,"6":7,"7":7,"8":7,"9":7,"A":7,"B":7,"C":7,"D":7,"E":6,"F":6,"G":7,"H":7,"I":4,"J":6,"K":7,"L":6,"M":8,"N":7,"O":7,"P":7,"Q":7,"R":7,"S":7,"T":6,"U":7,"V":8,"W":8,"X":7,"Y":7,"Z":6},"bold":{"0":6,"1":6,"2":6,"3":6,"4":6,"5":6,"6":6,"7":6,"8":6,"9":6,"A":6,"B":6,"C":6,"D":6,"E":5,"F":5,"G":6,"H":6,"I":4,"J":5,"K":6,"L":5,"M":9,"N":7,"O":6,"P":6,"Q":6,"R":6,"S":6,"T":6,"U":6,"V":7,"W":10,"X":6,"Y":6,"Z":6},"normal":{"0":5,"1":5,"2":5,"3":5,"4":5,"5":5,"6":5,"7":5,"8":5,"9":5}};
// ===== core.js =====
const APP = D.app;
const API = "http://localhost/api/";
const OFF = 300;                    // where elements wait off-screen
const T = 20, STILL = 120;          // seconds an element lives without being sent again: moving parts, still parts
const WHITE = "#FFFFFFFF", SOFT = "#FFFFFFB0", FAINT = "#FFFFFF66";
const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
let stopped = false;
let busy = false;                   // a change of page or of game is running: no internet request starts meanwhile
let offline = false;                // the last request to the internet failed
const sleep = (ms) => new Promise((done) => setTimeout(done, Math.max(0, ms)));
const ctl = { held: false, turn: 0, start: false, ok: false };
let onBack = null;                  // an app may take the Back key itself: a function that returns true = "taken, the app goes on"
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
function stay(end) {
if (ctl.ok) {
ctl.ok = false;
ctl.held = !ctl.held;
}
return !stopped && ctl.turn === 0 && (ctl.held || Date.now() < end);
}
const pad2 = (n) => (n < 10 ? "0" : "") + n;
function report(what, err) {
console.error(APP + ": " + what + ": " + (err && err.message ? err.message : String(err)));
}
let callWait = 0, netWait = 0;
function within(p, ms) {
if (!ms) return p;
return new Promise((done, fail) => {
const timer = setTimeout(() => fail(new Error("no answer in " + ms + " ms")), ms);
p.then((v) => {
clearTimeout(timer);
done(v);
}, (err) => {
clearTimeout(timer);
fail(err);
});
});
}
async function call(method, path, body, type) {
try {
const init = body === undefined ? { method: method }
: { method: method, headers: { "Content-Type": type || "application/json" }, body: body };
const res = await within(fetch(API + path, init), callWait);
const text = await within(res.text(), callWait);
return { ok: res.ok, status: res.status, text: text };
} catch (err) {
return { ok: false, status: 0, text: String(err) };
}
}
async function getJson(url) {
const res = await within(fetch(url), netWait);
const text = await within(res.text(), netWait);
if (!res.ok) {
throw new Error("HTTP " + res.status);
}
return JSON.parse(text);
}
const errs = { draw: 0, net: 0, saved: "" };
function saveErrs() {
const line = "draw " + errs.draw + " net " + errs.net;       // the file is rewritten when an error count changes,
if (line === errs.saved) return;                            // not every time a host answers: that would wear the flash
errs.saved = line;
call("POST", "storage/write?path=/ext/data/errors.txt", line + " sources " + JSON.stringify(sources), "application/octet-stream");
}
const sources = {};
async function getJsonAny(hosts, path) {
let last;
for (let i = 0; i < hosts.length; i++) {
try {
const got = await getJson(hosts[i] + path);
sources[hosts[i].slice(8)] = (sources[hosts[i].slice(8)] || 0) + 1;
if (i > 0) console.log(APP + ": " + hosts[i].slice(8) + " answered instead of " + hosts[0].slice(8));
return got;
} catch (err) {
last = err;
}
}
throw last;
}
async function loadSettings() {
const got = await call("GET", "apps/settings?app_id=" + APP);
try {
return (got.ok && JSON.parse(got.text).values) || {};
} catch (err) {
return {};
}
}
let zoneMs = 0;
async function syncTime() {
const got = await call("GET", "time");
const m = got.ok && /T\d+:\d+:\d+(?:\.\d+)?(Z|[+-]\d\d:?\d\d)?/.exec(got.text);
if (m && m[1] && m[1] !== "Z") {
const sign = m[1][0] === "-" ? -1 : 1;
const digits = m[1].replace(/[^0-9]/g, "");
zoneMs = sign * (Number(digits.slice(0, 2)) * 60 + Number(digits.slice(2, 4))) * 60000;
} else if (m) {
zoneMs = 0;
}
}
function local(ms) {
return new Date((ms === undefined ? Date.now() : ms) + zoneMs);
}
function smallWidth(s) {
let w = 0;
for (let i = 0; i < s.length; i++) {
w += D.small[s[i]] || 4;
}
return w + D.smallGap * (s.length - 1);
}
function fontWidth(s, table, other) {
let w = 0;
for (let i = 0; i < s.length; i++) {
w += s[i] === ":" ? 1 : (table[s[i]] || other);
}
return w + s.length - 1;
}
function textWidth(s, font) {
if (font === "small") return smallWidth(s);
if (font === "extra_large") return fontWidth(s, D.xl, 7);
if (font === "bold") return fontWidth(s, D.bold, 6);
return fontWidth(s, D.normal, 5);
}
function text(id, s, font, x, y, color, align, z) {
return { id: id, type: "text", text: s, font: font, x: x, y: y, align: align || "top_left", color: color,
timeout: T, z_index: z === undefined ? 4 : z };
}
function bar(id, x, y, w, h, color, z) {
return { id: id, type: "rectangle", x: x, y: y, width: w, height: h, fill: "solid", fill_colors: [color],
border_width: 0, timeout: T, z_index: z };
}
function image(id, path, x, y, z, w) {
return { id: id, type: "image", path: path, x: x, y: y, align: "top_left", timeout: STILL, z_index: z, _w: w,
_solid: w !== undefined };
}
function span(el) {
let w = el._w;
if (w === undefined) {
w = el.type === "text" ? textWidth(el.text, el.font) : el.type === "rectangle" ? el.width
: el.type === "xpmbitmap" ? Number(el.data.split("\n")[1].split(" ")[0]) : 16;
}
if (el.align === "top_right") return [el.x - w + 1, el.x];
if (el.align === "top_mid") return [el.x - (w >> 1), el.x - (w >> 1) + w - 1];
return [el.x, el.x + w - 1];
}
let band = 1000000000;           // pages can go above the one on screen (nextBand) or under it (roll)
const COLS = 6, COL_W = 12;
function nextBand() {
band += 20;
return band;
}
function lift(els, p, z) {
for (let i = 0; i < els.length; i++) els[i].z_index += z + 1;
for (let n = COLS - 1; n >= 0; n--) {
const a = n * COL_W, b = a + COL_W - 1;
if (n > 0 && els.some((el) => el._solid && el.x <= a && el.x + el._w - 1 >= b)) continue;
els.unshift({ id: p + "bk" + n, type: "rectangle", x: a, y: 0, width: COL_W, height: 16, fill: "solid",
fill_colors: ["#000000FF"], border_width: 0, timeout: STILL, z_index: z, _bk: true, _solid: true, _w: COL_W });
}
return els;
}
function bandOf(p) {
const rec = live.get(p + "bk0");
return rec ? rec.el.z_index : nextBand();
}
function skipOurs(key, value) {
return key.charCodeAt(0) === 95 ? undefined : value;
}
function wire(el, dx, dy) {
if (dx || dy) {
const moved = Object.assign({}, el);
moved.x = el.x + (dx || 0);
moved.y = el.y + (dy || 0);
return JSON.stringify(moved, skipOurs);
}
return JSON.stringify(el, skipOurs);
}
const live = new Map();             // id -> { s: the element as last sent, t: when, el }
async function post(parts) {
const got = await call("POST", "display/draw",
'{"application_name":"' + APP + '","priority":50,"elements":[' + parts.join(",") + "]}");
if (!got.ok) {
errs.draw++;
report("draw", got.status + " " + got.text.slice(0, 80));
}
return got.ok;
}
async function postAll(parts, n) {
let ok = true;
for (let i = 0; i < parts.length; i += n || 8) {
if (!(await post(parts.slice(i, i + (n || 8))))) ok = false;
}
return ok;
}
async function drop(ids) {
for (let i = 0; i < ids.length; i++) {
live.delete(ids[i]);
}
if (ids.length === 0) return;
const got = await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ids }));
if (got.ok || got.status !== 400 || ids.length === 1) return;
for (let i = 0; i < ids.length; i++) {     // one id that is already gone makes the bar refuse the whole list
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: [ids[i]] }));
}
}
function remember(els) {
const at = Date.now();
live.clear();
for (let i = 0; i < els.length; i++) {
live.set(els[i].id, { s: wire(els[i]), t: at, el: els[i] });
}
}
const MARK = ["zz_h1", "zz_h2"];
let markOn = false, markAt = 0;
async function mark() {
if (ctl.held && (!markOn || Date.now() - markAt > 40000)) {
await post(MARK.map((id, n) => '{"id":"' + id + '","type":"rectangle","x":' + (n * 2) + ',"y":0,"width":1,"height":3,' +
'"fill":"solid","fill_colors":["#FFFFFF8C"],"border_width":0,"timeout":' + STILL + ',"z_index":2147482000}'));
markOn = true;
markAt = Date.now();
} else if (!ctl.held && markOn) {
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: MARK }));
markOn = false;
}
}
let labelEnd = 0;
async function label(one, two, ms, dir) {
const parts = (dx) => {
const out = ['{"id":"zz_l0","type":"rectangle","x":' + (8 + dx) + ',"y":' + (two ? 0 : 2) + ',"width":56,"height":' +
(two ? 16 : 12) + ',"radius":2,"fill":"solid","fill_colors":["#000000FF"],"border_width":1,' +
'"border_color":"#FFFFFF40","timeout":4,"z_index":2147482500}',
'{"id":"zz_l1","type":"text","text":"' + one + '","font":"small","x":' + (36 + dx) + ',"y":' + (two ? 0 : 3) +
',"align":"top_mid","color":"#FFFFFFB0","timeout":4,"z_index":2147482501}'];
if (two) {
out.push('{"id":"zz_l2","type":"text","text":"' + two + '","font":"small","x":' + (36 + dx) + ',"y":7,' +
'"align":"top_mid","color":"#FFFFFF66","timeout":4,"z_index":2147482501}');
}
return out;
};
if (labelEnd) await unlabel(true);             // one label at a time
if (dir) await post(parts(36 * dir));          // it comes in from the side the knob was turned to
await post(parts(0));
labelIds = two ? ["zz_l0", "zz_l1", "zz_l2"] : ["zz_l0", "zz_l1"];
labelEnd = Date.now() + (ms || 1000);
}
let labelIds = [];
async function unlabel(now) {
if (!labelEnd || (!now && Date.now() < labelEnd)) return;
labelEnd = 0;
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: labelIds }));
}
async function show(els, partial) {
if (ctl.held !== markOn || markOn) await mark();
if (labelEnd) await unlabel();
const now = Date.now();
let batch = [];
const flush = async () => {
if (batch.length === 0) return;
const sent = batch;
batch = [];
if (await post(sent.map((b) => b.s))) {
const at = Date.now();
for (let i = 0; i < sent.length; i++) {
live.set(sent[i].el.id, { s: sent[i].s, t: at, el: sent[i].el });
}
}
};
for (let i = 0; i < els.length; i++) {
const el = els[i];
const s = wire(el);
const old = live.get(el.id);
if (old && old.s === s && now - old.t < 400 * el.timeout) continue;
batch.push({ el: el, s: s });
if (batch.length === 3) await flush();
}
await flush();
if (partial) return;
const keep = new Set();
for (let i = 0; i < els.length; i++) keep.add(els[i].id);
const stale = [];
for (const id of live.keys()) {
if (!keep.has(id)) stale.push(id);
}
await drop(stale);
}
function inOrder(els, dir) {
const out = [];
const col = (x) => Math.floor(Math.max(0, Math.min(COLS * COL_W - 1, x)) / COL_W);
for (let k = 0; k < COLS; k++) {
const n = dir > 0 ? k : COLS - 1 - k;
for (let i = 0; i < els.length; i++) {
if (els[i]._solid && col(span(els[i])[dir > 0 ? 0 : 1]) === n) out.push(els[i]);
}
for (let i = 0; i < els.length; i++) {
if (!els[i]._solid && col(span(els[i])[dir > 0 ? 1 : 0]) === n) out.push(els[i]);
}
}
return out;
}
async function firstShow(els) {
await post(inOrder(els, 1).map((el) => wire(el)));
remember(els);
}
const SPLASH_MS = 1500;             // the film's length: 30 pictures, 20 a second
let splashUp = 0;                   // when the film was sent; 0: none is on screen
async function splash(z) {
await post(['{"id":"zz_sp","type":"animation","path":"animations/splash.anim","x":0,"y":0,"align":"top_left",' +
'"loop":false,"section":"default","timeout":60,"z_index":' + z + "}"]);
splashUp = Date.now();
}
async function splashEnd() {
const end = splashUp + SPLASH_MS + 100;
while (splashUp && !stopped && Date.now() < end) await nap(end - Date.now());
ctl.turn = 0;
ctl.ok = ctl.start = false;
}
async function splashOff() {
if (!splashUp) return;
splashUp = 0;
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_sp"] }));
}
const timing = [];                  // measuring builds only: how long each step of the last changes took
async function change(els, dir, light) {
busy = true;
const t0 = Date.now(), mark = [];
try {
const olds = [];
for (const id of live.keys()) olds.push(id);
const parts = inOrder(els, dir || 1).map((el) => wire(el));
if (light) {
parts.unshift('{"id":"zz_band","type":"animation","path":"animations/band.anim","x":0,"y":0,"align":"top_left",' +
'"loop":false,"section":"default","timeout":5,"z_index":2147483000}');
}
await post(parts);
mark.push(Date.now() - t0);                   // new page drawn
await drop(olds);
mark.push(Date.now() - t0);                   // old page gone
remember(els);
if (light) {
await sleep(D.band);
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_band"] }));
}
} finally {
busy = false;
if (D.debug) {
timing.push((light ? "L " : "C ") + els.length + "/" + mark.join(" "));
call("POST", "storage/write?path=/ext/data/timing.txt", timing.join("\n"), "application/octet-stream");
}
}
}
async function roll(els, dir, blind) {
busy = true;
try {
const olds = [], way = blind || (dir < 0 ? "roll_dn" : "roll_up");   // (blind "flip": over the two marks only)
for (const id of live.keys()) olds.push(id);
for (let i = 0; i < els.length; i++) els[i].z_index -= 40;   // lifted one band above; it belongs one band under
band -= 40;
const whole = (await postAll(inOrder(els, 1).map((el) => wire(el, OFF, 0)))) && (await postAll(els.map((el) => wire(el))));
const t0 = Date.now();
await post([cardAnim("zz_c1", way + "_in", 0)]);
await sleep(D.roll - 30 - (Date.now() - t0));     // the request below needs about that long to take effect
await drop(olds);
if (whole) remember(els);
else await show(els, true);
await post([cardAnim("zz_c2", way + "_out", 0), cardAnim("zz_c1", way + "_in", OFF)]);
await sleep(D.roll + 50);
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_c1", "zz_c2"] }));
} finally {
busy = false;
}
}
async function notice(name, ms) {
busy = true;
try {
await post([cardAnim("zz_c1", "card_" + name + "_down", 0)]);
await sleep(D.card + (ms || 1200));
await post([cardAnim("zz_c2", "card_" + name + "_up", 0), cardAnim("zz_c1", "card_" + name + "_down", OFF)]);
await sleep(D.card + 60);
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_c1", "zz_c2"] }));
} finally {
busy = false;
}
}
function cardAnim(id, name, x) {
return '{"id":"' + id + '","type":"animation","path":"animations/' + name + '.anim","x":' + x + ',"y":0,"align":"top_left",' +
'"loop":false,"section":"default","timeout":20,"z_index":' + (id === "zz_c1" ? 2147481000 : 2147481001) + "}";
}
async function shutter(kind, els) {
busy = true;
try {
const olds = [], t0 = Date.now();
for (const rec of live.values()) olds.push(rec.el);
await post([cardAnim("zz_c1", "card_" + kind + "_down", 0)]);
await post(inOrder(els, 1).map((el) => wire(el, 0, 32)));
await sleep(D.card + 1000 - (Date.now() - t0));
await post(olds.map((el) => wire(el, 0, -32)).concat(els.map((el) => wire(el))));
await drop(olds.map((el) => el.id));
remember(els);
await post([cardAnim("zz_c2", "card_" + kind + "_up", 0), cardAnim("zz_c1", "card_" + kind + "_down", OFF)]);
await sleep(D.card + 60);
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_c1", "zz_c2"] }));
} finally {
busy = false;
}
}
const feeds = [];                   // async (now) => true when it asked for something
let fails = 0, netPause = 0;        // after a failure the internet is left alone for 10 s, 20 s, 40 s ... up to 2 min
let wifiUp = true;                  // what the bar said about its Wi-Fi when a request last failed
async function dataLoop() {
while (!stopped) {
let did = false;
if (!busy) {
const now = Date.now();
for (let i = 0; i < feeds.length && !did; i++) {
try {
did = await feeds[i](now);
if (did) {
offline = false;
fails = 0;
}
} catch (err) {
did = true;
offline = true;
errs.net++;
fails++;
netPause = Date.now() + Math.min(120000, 10000 * Math.pow(2, fails - 1));
report("data", err);
const wifi = await call("GET", "wifi/status");     // is it the Wi-Fi, or do the hosts not answer?
wifiUp = !wifi.ok || /"state"\s*:\s*"connected"/.test(wifi.text);
}
}
}
if (Date.now() - started > 100000 || errs.saved || errs.draw || errs.net) saveErrs();
await sleep(did ? 250 : 1000);
}
}
const started = Date.now();
let zoneDue = Date.now() + 3600000;
feeds.push(async (now) => {         // the time zone again every hour (summer time)
if (now < zoneDue) return false;
zoneDue = now + 3600000;
await syncTime();
return false;
});
const unbind = listen("input", (event) => {
if (stopped) return;
if (D.debug) console.log(APP + " input " + JSON.stringify(event));
if (event.key === "back") {
if (event.action !== "short") return;
if (onBack && onBack()) {       // (Flight: a step back, or "end the flight?")
if (wake) wake();
return;
}
stopped = true;                 // every loop ends at its next step; then nothing keeps the app alive
setTimeout(unbind, 10);
} else if (event.key === "encoder") {
ctl.turn += event.delta > 0 ? 1 : event.delta < 0 ? -1 : 0;
} else if (event.action === "short" && event.key === "ok") {
ctl.ok = true;
} else if (event.action === "short" && event.key === "start") {
ctl.start = true;
} else {
return;
}
if (wake) wake();
});
// ===== flight.js =====
(function () {
const AMBER = "#FFBE28FF", DIM = "#96681AFF", GREY = "#969CAAFF", INK = "#28221CFF", PAPER = "#F6ECD4FF";
const BUILT_IN = Math.min(D.n, D.core.length * D.recPer);     // the airports that are in this script
let N = BUILT_IN;                   // the airports in use: the built-in ones until all of them are in storage
const RAD = Math.PI / 180;
const FAST = D.fast || 1;           // test builds: a flight's clock runs this many times as fast
const STEPS = [15, 20, 25, 30, 40, 45, 50, 60, 75, 90, 105, 120, 150, 180, 210, 240, 300, 360, 420, 480, 540, 600, 720, 840, 960];
const PAGE_MS = 14000;              // how long each of the two pages of a flight stays before the other takes its turn
const st = { at: 0, log: [], fly: null };       // kept in storage: where you are, the logbook, the flight in the air
let mode = "lobby", minutes = 60, cands = [], pick = 0, since = 0, backs = 0;
let cover = "few", coverAt = 0, coverFor = "";  // the clouds under the wing, when they were asked for, and for which flight
let units = "km", weatherOn = true, eggsOn = true, trueSky = false;
const pad2 = (n) => (n < 10 ? "0" : "") + n;
const mod = (a, n) => ((a % n) + n) % n;
const b36 = (s, at, n) => {
let v = 0;
for (let k = 0; k < n; k++) {
const c = s.charCodeAt(at + k);
v = v * 36 + (c <= 57 ? c - 48 : c - 87);
}
return v;
};
const AP = "/ext/data/ap/";
const numbers = (n) => (typeof Int16Array === "function" ? new Int16Array(n) : new Array(n));
const UNIT = 4232;                  // the length of a direction as it is kept
let geoX = null, geoY = null, geoZ = null;
let places = {}, placed = 0;        // airport -> [lat, lon] in degrees, worked out when first asked for
let whole = false, wholeReady = false;          // all the airports are in use / are in storage, ready to be taken
let apDone = 0, apFailed = false;               // files fetched so far (the hall shows it as a line); a fetch failed: to be said once
const recs = {};                    // airport -> its line: code (3), clock (2), country (2), city
let fileAt = -1, fileLines = null;  // the file of names read last (turning the wheel stays in it for a while)
const rec = (i) => recs[i] || "---1c  ";
const code = (i) => rec(i).slice(0, 3);
function place(i) {
let at = places[i];
if (!at) {
if (placed > 80) {
places = {};
placed = 0;
}
at = places[i] = [Math.asin(Math.max(-1, Math.min(1, geoZ[i] / UNIT))) / RAD, Math.atan2(geoY[i], geoX[i]) / RAD];
placed++;
}
return at;
}
const lat = (i) => place(i)[0];
const lon = (i) => place(i)[1];
const offMin = (i) => b36(rec(i), 3, 2) * 15 - 720;             // minutes ahead of UTC
const cityOf = (i) => rec(i).slice(7);
const country = (i) => D.country[rec(i).slice(5, 7)] || "";
async function readAp(name) {
const got = await call("GET", "storage/read?path=" + AP + name);
return got.ok ? got.text : null;
}
async function writeAp(name, text) {
return (await call("POST", "storage/write?path=" + AP + name, text, "application/octet-stream")).ok;
}
function putGeo(base, s, n) {       // (two characters a number, base 92 from "#" on)
const off = 35 * 92 + 35 + UNIT;
for (let j = base, k = 0, end = base + n; j < end; j++, k += 6) {
geoX[j] = s.charCodeAt(k) * 92 + s.charCodeAt(k + 1) - off;
geoY[j] = s.charCodeAt(k + 2) * 92 + s.charCodeAt(k + 3) - off;
geoZ[j] = s.charCodeAt(k + 4) * 92 + s.charCodeAt(k + 5) - off;
}
}
async function fillGeo() {
for (let k = 0; k * D.geoPer < D.n; k++) {
const s = await readAp("g" + k + ".txt"), base = k * D.geoPer, n = Math.min(D.geoPer, D.n - base);
if (s === null || s.length < n * 6) return false;
putGeo(base, s, n);
await sleep(1);
}
places = {};
placed = 0;
return true;
}
async function geoOf(list) {
for (let k = 0; k < list.length; k++) {
const i = list[k], c = Math.floor(i / D.geoPer);
if (typeof i !== "number" || i < BUILT_IN || i >= D.n) continue;          // (the built-in ones are there already)
const s = await readAp("g" + c + ".txt"), at = (i - c * D.geoPer) * 6;
if (s !== null && s.length >= at + 6) putGeo(i, s.slice(at, at + 6), 1);
}
}
async function loadGeo() {
const stamp = await readAp("v.txt");
if (stamp === null || stamp.trim() !== D.stamp || !(await fillGeo())) return false;
N = D.n;
whole = true;
return true;
}
let geoReady = Promise.resolve();
let fillStart = null;
function fillNow() {
if (fillStart) fillStart();
}
async function openAirports() {
const stamp = await readAp("v.txt");
geoX = numbers(D.n);
geoY = numbers(D.n);
geoZ = numbers(D.n);
putGeo(0, D.coreGeo, N);
if (stamp === null || stamp.trim() !== D.stamp) {
fetchAirports();
return;
}
const builtIn = N;
N = D.n;
whole = true;
geoReady = new Promise((done) => {
fillStart = () => {
fillStart = null;
fillGeo().then((ok) => {
if (ok) return;
N = builtIn;                             // a file is missing after all: the built-in airports, and fetch again
whole = false;
if (st.at >= N) st.at = 0;
call("DELETE", "storage/remove?path=" + AP + "v.txt");
fetchAirports();
}).then(done, done);
};
});
}
async function fetchAirports() {
let wait = 20000;
while (!stopped && !whole && !wholeReady) {
if (await fetchOnce()) {
wholeReady = true;            // (taken by the main loop, between two pages)
return;
}
if (wait === 20000) apFailed = true;         // (said once a start, not at every try)
await sleep(wait);
wait = Math.min(wait * 2, 900000);
}
}
async function fetchOnce() {
await call("POST", "storage/mkdir?path=/ext/data/ap");       // (it may be there already)
const have = {}, set = await readAp("set.txt");
if (set !== null && set.trim() === D.stamp) {
try {
const list = JSON.parse((await call("GET", "storage/list?path=/ext/data/ap")).text).list;
for (let k = 0; k < list.length; k++) have[list[k].name] = list[k].size;
} catch (err) {
}
} else if (!(await writeAp("set.txt", D.stamp))) return false;
let next = 0, bad = false;
apDone = 0;
const worker = async () => {                   // (three files at a time: a first start is over in half a minute)
while (!bad && !stopped && next < D.sizes.length) {
const name = D.sizes[next][0], size = D.sizes[next][1];
next++;
if (have[name] !== size) {
let text = null;
try {
const res = await fetch(D.apUrl + name);
if (res.ok) text = await res.text();
} catch (err) {
errs.net++;
}
if (text === null || text.length !== size || !(await writeAp(name, text))) {
bad = true;
return;
}
}
apDone++;
}
};
await Promise.all([worker(), worker(), worker()]);
if (bad || stopped) return false;
return writeAp("v.txt", D.stamp);
}
let needLine = Promise.resolve();
function need(list) {
needLine = needLine.then(() => needNow(list), () => needNow(list));
return needLine;
}
async function needNow(list) {
let count = 0;
for (const k in recs) count++;
if (count > 120) {
const keep = {};
const all = list.concat(cands, [st.at], st.fly ? [st.fly.from, st.fly.to] : []);
for (let k = 0; k < all.length; k++) keep[all[k]] = 1;
for (const k in recs) if (!keep[k]) delete recs[k];
}
for (let k = 0; k < list.length; k++) {
const i = list[k];
if (typeof i !== "number" || i < 0 || i >= N || recs[i]) continue;
const c = Math.floor(i / D.recPer);
if (c !== fileAt) {
const s = c < D.core.length ? D.core[c] : await readAp("a" + c + ".txt");
if (s === null) continue;
fileLines = s.split("\n");
fileAt = c;
}
recs[i] = fileLines[i - c * D.recPer] || "";
}
}
function km(a, b) {
const dot = (geoX[a] * geoX[b] + geoY[a] * geoY[b] + geoZ[a] * geoZ[b]) / (UNIT * UNIT);
return 6371 * Math.acos(Math.max(-1, Math.min(1, dot)));
}
function flightMin(dist) {
return dist / 13.6 + 12;
}
let reachKey = "", reachList = [];
async function reach(from, min, patient) {
const key = from + ":" + min;
if (key === reachKey) return reachList;
fillNow();
await geoReady;
const ok = Math.max(5, min * 0.07), x0 = geoX[from], y0 = geoY[from], z0 = geoZ[from], fit = [], best = [];
const U2 = UNIT * UNIT, turnOf = (minutes) => Math.max(0, Math.min(Math.PI, (minutes - 12) * 13.6 / 6371));    // the angle flown in that time
const near = min - ok <= 12 ? U2 * 2 : Math.cos(turnOf(min - ok)) * U2, far = Math.cos(turnOf(min + ok)) * U2;
let lo = -U2 * 2, hi = U2 * 2;                 // while fewer than six fit: what would be among the six nearest in time
for (let i = 0; i < N; i++) {
if ((i & 127) === 127) {
await sleep(1);
if (!patient && (ctl.turn || ctl.ok || ctl.start || backs)) return null;
}
if (i === from) continue;
const dot = geoX[i] * x0 + geoY[i] * y0 + geoZ[i] * z0;
if (dot >= far && dot <= near) {
fit.push(i);                               // (in the order of the table: the best-known airports first)
if (fit.length >= 40) break;
} else if (fit.length < 6 && dot > lo && dot < hi) {
const off = Math.abs(Math.acos(Math.max(-1, Math.min(1, dot / U2))) * 6371 / 13.6 + 12 - min);
let at = best.length;
while (at > 0 && best[at - 1].off > off) at--;
best.splice(at, 0, { i: i, off: off });
if (best.length > 6) best.pop();
if (best.length === 6) {                   // from now on only what is nearer than the sixth is looked at
const worst = best[5].off;
hi = min - worst <= 12 ? U2 * 2 : Math.cos(turnOf(min - worst)) * U2;
lo = Math.cos(turnOf(min + worst)) * U2;
}
}
}
if (fit.length < 6) {                          // the few that fit, and the nearest in time to fill up to six
for (let k = 0; k < best.length && fit.length < 6; k++) fit.push(best[k].i);
}
reachKey = key;
reachList = fit;
return reachList;
}
function along(a, b, part) {
const p1 = lat(a) * RAD, l1 = lon(a) * RAD, p2 = lat(b) * RAD, l2 = lon(b) * RAD;
const d = km(a, b) / 6371;
if (d < 0.0001) return [lat(a), lon(a)];
const A = Math.sin((1 - part) * d) / Math.sin(d), B = Math.sin(part * d) / Math.sin(d);
const x = A * Math.cos(p1) * Math.cos(l1) + B * Math.cos(p2) * Math.cos(l2);
const y = A * Math.cos(p1) * Math.sin(l1) + B * Math.cos(p2) * Math.sin(l2);
const z = A * Math.sin(p1) + B * Math.sin(p2);
return [Math.atan2(z, Math.sqrt(x * x + y * y)) / RAD, Math.atan2(y, x) / RAD];
}
function standing(ra, dec, la, lo, d) {
const turn = (18.697374558 + 24.06570982441908 * d) * 15 * RAD;      // the earth's turn (sidereal time, as an angle)
const ha = turn + lo * RAD - ra, p = la * RAD;
const height = Math.asin(Math.sin(p) * Math.sin(dec) + Math.cos(p) * Math.cos(dec) * Math.cos(ha)) / RAD;
const south = Math.atan2(Math.sin(ha), Math.cos(ha) * Math.sin(p) - Math.tan(dec) * Math.cos(p)) / RAD;   // from south, westwards
return [height, mod(south + 180, 360)];
}
function sunAt(la, lo, ms) {
const d = ms / 86400000 - 10957.5;
const g = (357.529 + 0.98560028 * d) * RAD;
const L = (280.459 + 0.98564736 * d + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g)) * RAD;
const e = 23.439 * RAD;
return standing(Math.atan2(Math.cos(e) * Math.sin(L), Math.cos(L)), Math.asin(Math.sin(e) * Math.sin(L)), la, lo, d);
}
function moonAt(la, lo, ms) {
const d = ms / 86400000 - 10957.5, e = 23.439 * RAD;
const lon = (218.316 + 13.176396 * d + 6.289 * Math.sin((134.963 + 13.064993 * d) * RAD)) * RAD;
const lat = 5.128 * Math.sin((93.272 + 13.22935 * d) * RAD) * RAD;
const ra = Math.atan2(Math.sin(lon) * Math.cos(e) - Math.tan(lat) * Math.sin(e), Math.cos(lon));
const dec = Math.asin(Math.sin(lat) * Math.cos(e) + Math.cos(lat) * Math.sin(e) * Math.sin(lon));
return standing(ra, dec, la, lo, d);
}
function courseTo(at, to) {
const p1 = at[0] * RAD, p2 = lat(to) * RAD, dl = (lon(to) - at[1]) * RAD;
return mod(Math.atan2(Math.sin(dl) * Math.cos(p2), Math.cos(p1) * Math.sin(p2) - Math.sin(p1) * Math.cos(p2) * Math.cos(dl)) / RAD, 360);
}
function moonPhase(ms) {
const age = mod(ms / 86400000 - 10962.76, 29.530588) / 29.530588;    // (a new moon: 6 January 2000, 18:14 UTC)
return Math.floor(age * 8 + 0.5) % 8;
}
async function load() {
const got = await call("GET", "storage/read?path=/ext/data/flight.json");
try {
const kept = got.ok && !D.fresh ? JSON.parse(got.text) : null;
if (kept && typeof kept.at === "number" && kept.at >= 0 && kept.at < N) {
st.at = kept.at;
st.code = kept.code || "";
st.log = kept.log && kept.log.length ? kept.log.slice(0, 60) : [];
st.fly = kept.fly && kept.fly.to < N && kept.fly.from < N ? kept.fly : null;
if (typeof kept.rs === "number") st.rs = kept.rs;
}
} catch (err) {
}
}
function save() {
if (recs[st.at]) st.code = code(st.at);        // (the table's order can change with a new set of airports: the letters stay)
return call("POST", "storage/write?path=/ext/data/flight.json", JSON.stringify(st), "application/octet-stream");
}
let resetOn = null;                 // the switch "Start over" as last read (null: not read yet)
async function readSettings() {
const v = await loadSettings();
units = v.units === "mi" ? "mi" : "km";
weatherOn = v.weather !== false && !D.noWeather;
eggsOn = v.eggs !== false;
trueSky = v.sky === true;
if (typeof v.reset === "boolean") resetOn = v.reset;
}
let settingsDue = 0;
feeds.unshift(async (now) => {
if (now < settingsDue) return false;
settingsDue = now + 5000;
await readSettings();
if (resetWanted() && wake) wake();
return false;
});
function resetWanted() {
if (resetOn === null) return false;
if (st.rs === undefined) {
st.rs = resetOn ? 1 : 0;
save();
return false;
}
return (st.rs === 1) !== resetOn;
}
async function clearAll() {
st.at = 0;
st.code = "";
st.log = [];
st.fly = null;
st.rs = resetOn ? 1 : 0;
mode = "lobby";
minutes = 60;
cands = [];
pick = logPick = late = lockPage = 0;
locked = finding = turned = false;
findWord = "---";
findAt = hintAt = eggDue = 0;
egg = coverWanted = null;
coverFor = ticketPic = "";
toast = { word: "", until: 0 };
logFrom = "lobby";
for (const k in flaps) delete flaps[k];
await need([0]);
await save();
}
async function startOver() {
await clearAll();
await card("START OVER", "CLEARED", 1500);
since = Date.now();
}
function rect(id, x, y, w, h, colour, z, radius) {
const el = bar(id, x, y, w, h, colour, z);
el.timeout = STILL;
if (radius) el.radius = radius;
return el;
}
function still(el) {
el.timeout = STILL;
return el;
}
function bitmap(id, data, x, y, z) {
return { id: id, type: "xpmbitmap", x: x, y: y, align: "top_left", timeout: STILL, data: data, z_index: z };
}
function film(id, name, x, y, z, loop) {
return { id: id, type: "animation", path: "animations/" + name + ".anim", x: x, y: y, align: "top_left", loop: loop !== false,
section: "default", timeout: STILL, z_index: z };
}
const UPDOWN = "! XPM2\n5 5 2 1\n. c none\na c #96681A\n..a..\n.aaa.\n.....\n.aaa.\n..a..";
const NOSE = "! XPM2\n3 3 2 1\n. c none\na c #FFFFFF\na..\naaa\na..";
const PLANE = "! XPM2\n7 5 3 1\n. c none\na c #FFFFFF\nb c #AAB4C8\n...b...\nb..ab..\naaaaaaa\nb..ab..\n...b...";
const TICK = "! XPM2\n7 6 2 1\n. c none\na c #5AEB82\n......a\n.....aa\na...aa.\naa.aa..\n.aaa...\n..a....";
const DASH = ["000000", "000000", "000000", "011110", "011110", "000000", "000000"];     // "-": no letter
const BLANK = ["000000", "000000", "000000", "000000", "000000", "000000", "000000"];    // " ": the dash while it blinks
function tileData(ch, w, old, phase, tint) {
const fresh = ch === "-" ? DASH : ch === " " ? BLANK : D.mono[ch] || D.mono["0"];
const was = old === "-" ? DASH : old === " " ? BLANK : D.mono[old] || fresh, pad = (w - 6) >> 1;
const inks = tint === "g" ? "a c #6E727E\nb c #45474F" : "a c #FFBE28\nb c #96681A";
let data = "! XPM2\n" + w + " 9 6 1\nk c #221B0B\ns c #100C04\n" + inks + "\nc c #000000\nd c #8A6E30\n";
for (let r = 0; r < 9; r++) {
let glyph = fresh, ink = "a", ground = r === 4 ? "s" : "k";
if (phase === 1) {
if (r <= 3) ink = "b";
else if (r === 4) ground = "c";
else glyph = was;
} else if (phase === 2) {
if (r === 4) ground = "d";
else if (r >= 5) { glyph = was; ink = "b"; }
} else if (phase === 3) {
if (r === 5 || r === 6) ink = "b";
else if (r >= 7) glyph = null;
}
const row = glyph && r >= 1 && r <= 7 ? glyph[r - 1] : "000000";
let line = "";
for (let x = 0; x < w; x++) line += x >= pad && x < pad + 6 && row.charAt(x - pad) === "1" && !(phase === 1 && r === 4) ? ink : ground;
data += line + (r < 8 ? "\n" : "");
}
return data;
}
function tiles(els, id, letters, x, y, w, tints) {
for (let k = 0; k < letters.length; k++) {
els.push(bitmap(id + "t" + k, tileData(letters.charAt(k), w || 10, "", 0, tints ? tints.charAt(k) : ""), x + k * ((w || 10) + 1), y, 2));
}
return x + letters.length * ((w || 10) + 1);
}
const flaps = {};                   // what each row of tiles last showed
async function flip(key, ids, letters, xs, y, w, tints) {
const was = flaps[key];
flaps[key] = letters;
if (!was || was === letters || was.length !== letters.length || ctl.turn) return;      // (more turns waiting: no time for it)
for (let phase = 1; phase <= 3; phase++) {
const parts = [];
for (let k = 0; k < letters.length; k++) {
if (was.charAt(k) !== letters.charAt(k)) parts.push(wire(bitmap(ids + k, tileData(letters.charAt(k), w, was.charAt(k), phase, tints ? tints.charAt(k) : ""), xs[k], y, 2)));
}
if (parts.length) await post(parts);
await sleep(45);
}
}
function fit(s, room) {
let out = s;
while (out.length > 1 && smallWidth(out) > room) out = out.slice(0, -1);
return out;
}
function small(id, s, x, y, colour, align) {
return still(text(id, s, "small", x, y, colour, align || "top_left", 4));
}
function tag(els, p) {
for (let i = 0; i < els.length; i++) els[i].id = p + "_" + els[i].id;
return els;
}
function hm(min) {
const h = Math.floor(min / 60), m = Math.round(min % 60);
return h ? h + "H" + (m ? pad2(m) : "") : m + "M";
}
const TX = (label) => 2 + smallWidth(label) + 4;                      // where an airport's tiles start, after the label
function airportEls(label, i, extra, tints, hint) {
const els = [rect("bg", 0, 0, 72, 16, "#000000FF", 0)];
const land = country(i), both = land && smallWidth(cityOf(i)) + 5 + smallWidth(land) <= 68;       // the country only when both fit whole
if (hint === null) {
} else if (hint !== undefined) {
const part = (v, k) => ("0" + Math.round(v * hint * (k || 1)).toString(16).toUpperCase()).slice(-2);
const grey = "#" + part(200) + part(204) + part(214), amber = "#" + part(255) + part(190) + part(40);
const ground = "#" + part(255, 0.6) + part(190, 0.6) + part(40, 0.6), down = mod(Date.now() - hintAt, 800) >= 500;
const press = "! XPM2\n5 5 3 1\n. c none\na c " + amber + "\ng c " + ground + "\n" + (down ? ".....\naaaaa\n.aaa.\n..a.." : "aaaaa\n.aaa.\n..a..\n.....") + "\nggggg";
els.push(bitmap("ha", "! XPM2\n6 3 2 1\n. c none\na c " + grey + "\n..aa..\n.aaaa.\naaaaaa", 33, 1, 4),
small("h1", "NEXT", 31, -1, grey + "FF", "top_right"),
bitmap("hb", press, 60, 0, 4), small("h3", "FIND", 58, -1, amber + "FF", "top_right"));
} else {
els.push(small("city", fit(cityOf(i), 68), 2, -1, WHITE));
if (both) els.push(small("land", land, 70, -1, GREY, "top_right"));
}
els.push(small("lab", label, 2, 8, DIM));                           // rows 9-13, level with the middle of the tiles (rows 7-15)
tiles(els, "a", code(i), TX(label), 7, 8, tints);
if (extra) els.push(small("ex", extra, 70, 8, GREY, "top_right"));
else els.push(bitmap("ud", UPDOWN, 66, 9, 4));
return tag(els, label === "TO" ? "d" : "h");
}
function findEls(label, word, at, on) {
const run = still(text("run", "TURN THE KNOB = CHOOSE A LETTER       OK = NEXT LETTER       BACK = LEAVE THE SEARCH", "small", 2, -1, GREY, "top_left", 4));
run.width = 68;
run.scroll_rate = 800;            // columns a minute
run.scroll_start_delay = 700;
run.scroll_repeat_delay = 1200;
const els = [rect("bg", 0, 0, 72, 16, "#000000FF", 0), run, small("lab", label, 2, 8, DIM)];
tiles(els, "a", findShown(word, at, on), TX(label), 7, 8, at === 0 ? " gg" : at === 1 ? "  g" : "");
els.push(bitmap("ud", UPDOWN, 66, 9, 4));
return tag(els, label === "TO" ? "d" : "h");
}
function findShown(word, at, on) {
let out = "";
for (let k = 0; k < 3; k++) out += k > at ? "-" : k === at && word.charAt(k) === "-" && !on ? " " : word.charAt(k);
return out;
}
const UP = "! XPM2\n6 3 2 1\n. c none\na c #C8CCD6\n..aa..\n.aaaa.\naaaaaa";
const UP_OK = "! XPM2\n6 3 2 1\n. c none\na c #FFBE28\n..aa..\n.aaaa.\naaaaaa";
function lobbyEls() {
const loading = !whole && apDone > 0, where = loading ? "LOADING " + Math.floor(100 * apDone / D.sizes.length) + "%" : fit(cityOf(st.at), 44);
const els = [rect("bg", 0, 0, 72, 16, "#000000FF", 0), bitmap("up", UP, 33, 0, 4), small("log", "LOGBOOK", 22, 2, "#C8CCD6FF", "top_mid"),
loading ? small("at", where, 1, 8, DIM) : small("at", where, 22, 8, DIM, "top_mid"),       // (the count is too wide for the middle)
bitmap("ok", UP_OK, 59, 0, 4), small("go1", "CHECK", 58, 2, AMBER, "top_mid"), small("go2", "IN", 58, 8, AMBER, "top_mid")];
return tag(els, "y");
}
async function findCode(word) {
if (whole) {
const s = await readAp("l" + word.charAt(0) + ".txt"), rest = word.slice(1);
if (s !== null) for (let k = 0; k + 5 <= s.length; k += 5) if (s.slice(k, k + 2) === rest) return b36(s, k + 2, 3);
return -1;
}
for (let c = 0; c < D.core.length; c++) {
const lines = D.core[c].split("\n");
for (let j = 0; j < lines.length; j++) if (lines[j].slice(0, 3) === word) return c * D.recPer + j;
}
return -1;
}
const ABC = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let hintAt = 0;                     // when an airport page came up: its hint shows for the first moments
let hintUp = false;                 // the hint is on the page that is on screen
function hintNow() {
const age = Date.now() - hintAt;
return age >= HINT_MS ? undefined : Math.max(0.08, age < 600 ? age / 600 : age > HINT_MS - 600 ? (HINT_MS - age) / 600 : 1);
}
const HINT_MS = 2800;
let finding = false, findAt = 0, findWord = "---";     // the search on an airport page: on, which letter, the letters
let blinkOn = true, turned = false;
async function openFind() {
findWord = "---";
findAt = 0;
blinkOn = true;
finding = true;
await card("FIND AN AIRPORT", "SEARCH", 1100);
flaps[mode === "dest" ? "d" : "h"] = "";
}
function clock4(min) {
return pad2(Math.floor(min / 60)) + pad2(min % 60);
}
const TIME_X = [33, 42, 53, 62];    // the columns of those four tiles (8 wide), a colon between the pairs
function timeEls(busy) {
const els = [rect("bg", 0, 0, 72, 16, "#000000FF", 0)];
if (busy === true) els.push(small("l1", "FINDING", 2, 1, AMBER), film("sk", "seek", 3, 11, 3));
else if (busy) els.push(small("l1", "FOUND", 2, 1, AMBER), small("l2", busy + "", 2, 8, WHITE));
else els.push(small("l1", "FLIGHT", 2, 1, GREY), small("l2", "TIME", 2, 8, GREY));
const digits = clock4(minutes);
for (let k = 0; k < 4; k++) els.push(bitmap("tt" + k, tileData(digits.charAt(k), 8, "", 0), TIME_X[k], 4, 2));
els.push(rect("c1", 51, 6, 1, 2, AMBER, 2), rect("c2", 51, 10, 1, 2, AMBER, 2));
return tag(els, "m");
}
function readyEls(hint) {
const els = [rect("bg", 0, 0, 72, 16, "#000000FF", 0)];
tiles(els, "a", code(st.at), 3, 4, 8);         // (tiles with one column either side of the letter: the two airports
tiles(els, "b", code(cands[pick]), 43, 4, 8);  // stand closer to the middle, clear of the screen's edges)
els.push(bitmap("pl", PLANE, 33, 6, 3));
if (hint) els.push(film("tap", "tap", 0, 0, 9));
return tag(els, "r");
}
function ticketData() {
const rows = [];
for (let y = 0; y < 16; y++) {
let line = "";
for (let x = 0; x < 72; x++) {
const corner = (x === 0 || x === 71) && (y === 0 || y === 15), notch = x === 52 && (y === 0 || y === 15);
line += corner || notch ? "." : x === 52 && y % 2 === 0 ? "f" : "p";
}
rows.push(line.split(""));
}
const stamp = (glyph, x0, y0, key) => {
for (let r = 0; r < glyph.length; r++) {
for (let c = 0; c < glyph[r].length; c++) if (glyph[r].charAt(c) === "1") rows[y0 + r][x0 + c] = key;
}
};
const word = (str, x0) => {
for (let k = 0; k < str.length; k++) stamp(D.mono[str.charAt(k)] || D.mono["0"], x0 + k * 7, 1, "k");
};
word(code(st.at), 4);
stamp(["100", "111", "100"], 25, 3, "r");
word(code(cands[pick]), 30);
const seat = (1 + (st.at * 7 + cands[pick] * 3 + minutes) % 38) + "ABCDEF".charAt((st.at + cands[pick]) % 6);
const print = hm(minutes) + "  " + seat;
for (let k = 0; k < print.length; k++) stamp(D.tiny[print.charAt(k)] || D.tiny[" "], 4 + k * 4, 9, "r");
const bars = [1, 2, 1, 1, 2, 1, 2, 1];
let bx = 55;
for (let k = 0; k < bars.length && bx + bars[k] <= 69; k++) {
for (let x = bx; x < bx + bars[k]; x++) for (let y = 2; y < 14; y++) rows[y][x] = "k";
bx += bars[k] + 1;
}
let data = "! XPM2\n72 16 5 1\n. c none\np c #F6ECD4\nf c #5A4E40\nk c #28221C\nr c #A8452E\n";
for (let y = 0; y < 16; y++) data += rows[y].join("") + (y < 15 ? "\n" : "");
return data;
}
let ticketPic = "";                 // the ticket of the flight being planned, made once when it is printed
function ticketEls(hint, x) {
const els = [rect("bg", 0, 0, 72, 16, "#000000FF", 0), bitmap("tk", ticketPic, x || 0, 0, 2)];
if (hint) els.push(film("tap", "tap", 0, 0, 9));
return tag(els, "k");
}
function flightNow() {
const f = st.fly, total = f.min * 60000, now = Date.now();
const idle = (f.held || 0) + (f.paused ? now - f.paused : 0);
const gone = Math.max(0, Math.min(total, (now - f.t0 - idle) * FAST));
return { part: gone / total, left: total - gone, total: total, dist: km(f.from, f.to), idle: idle };
}
function leftText(ms) {
const s = Math.ceil(ms / 1000);
if (s >= 3600) return Math.floor(s / 3600) + ":" + pad2(Math.floor(s % 3600 / 60));
return Math.floor(s / 60) + ":" + pad2(s % 60);
}
const SKY = [[-14, [4, 6, 26], [14, 20, 50]], [-6, [18, 22, 60], [96, 62, 112]], [0, [58, 46, 122], [255, 148, 78]],
[5, [56, 96, 196], [246, 196, 128]], [16, [38, 112, 214], [150, 200, 245]]];
function skyAt(height) {
let k = 0;
while (k < SKY.length - 2 && height > SKY[k + 1][0]) k++;
const a = SKY[k], b = SKY[k + 1];
const t = Math.max(0, Math.min(1, (height - a[0]) / (b[0] - a[0])));
const hex = (v) => ("0" + Math.round(v).toString(16).toUpperCase()).slice(-2);
const col = (n) => "#" + hex(a[n][0] + (b[n][0] - a[n][0]) * t) + hex(a[n][1] + (b[n][1] - a[n][1]) * t) +
hex(a[n][2] + (b[n][2] - a[n][2]) * t) + "FF";
return [col(1), col(2)];
}
let egg = null, eggDue = 0;
const rnd = (n) => Math.floor(Math.random() * n);
function eggEls(els, now, light, when) {
const gap = () => (D.fast ? 5000 + rnd(4000) : egg === null && !eggDue ? 180000 + rnd(240000) : 600000 + rnd(600000));
if (!egg) {
if (!eggDue) eggDue = now + gap();
if (now < eggDue) return;
const month = new Date(when).getUTCMonth(), fit = [];
for (let k = 0; k < D.egg.length; k++) {
const at = D.egg[k].at;
if (at === "any" || (at === "day" && light !== "n") || (at === "night" && light === "n") || (at === "dec" && light === "n" && month === 11)) fit.push(k);
}
const k = fit[rnd(fit.length)];
egg = { k: D.eggOnly !== undefined ? D.eggOnly : k, at: now, x: 8 + rnd(Math.max(1, 34 - D.egg[k].w)), y: 5 + rnd(2),
stay: D.fast ? 6000 : 240000 + rnd(60000) };
}
const e = D.egg[egg.k], t = now - egg.at, slide = 4500;
let x;
if (t < slide) x = 73 - (73 - egg.x) * (1 - Math.pow(1 - t / slide, 2));
else if (t < slide + egg.stay) x = egg.x;
else if (t < 2 * slide + egg.stay) x = egg.x - (egg.x + e.w + 1) * Math.pow((t - slide - egg.stay) / slide, 2);
else {
egg = null;
eggDue = now + gap();
return;
}
els.push(bitmap("eg" + egg.k, e.d[Math.floor(now / 480) % 2], Math.round(x), egg.y + Math.floor(now / 1300) % 2, 2));
}
let toast = { word: "", until: 0 };
function windowEls(now) {
const f = st.fly, fl = flightNow(), at = along(f.from, f.to, fl.part);
const when = f.t0 + (now - f.t0) * FAST;       // (in a test build the sun moves as fast as the flight)
const sun = sunAt(at[0], at[1], when), height = sun[0], sky = skyAt(height);
const light = height > 6 ? "d" : height > -5 ? "g" : "n";
const els = [{ id: "sky", type: "rectangle", x: 0, y: 0, width: 72, height: 16, fill: "gradient_v", fill_colors: sky, border_width: 0,
timeout: STILL, z_index: 0 }];
if (height < -8) els.push(bitmap("st", D.stars[Math.floor(now / 1500) % 2], 0, 0, 1));
if (height < -9 && (Math.abs(at[0]) >= 57 || D.aurora)) els.push(film("au", "aurora", 0, 0, 2));
const out = courseTo(at, f.to) - 90;           // the direction the window looks in
const columnOf = (body) => {
if (!trueSky) return 40;
const side = mod(body[1] - out + 540, 360) - 180;
return body[0] <= 40 && Math.abs(side) <= 65 ? Math.round(34 + side / 65 * 28) : -1;
};
if (height < -5) {
const moon = moonAt(at[0], at[1], when), x = moon[0] >= 0 ? columnOf(moon) : -1;
if (x >= 0) els.push(film("mo", "moon_" + moonPhase(when), x - 4, Math.max(2, Math.min(5, Math.round(6 - moon[0] * 0.15))) - 4, 2, false));
} else if (height >= -3) {
const x = columnOf(sun);
if (x >= 0) els.push(film("sn", height > 8 ? "sun_d" : "sun_g", x - 4, Math.max(2, Math.round(10 - height * 0.26)) - 4, 2, false));
}
if (eggsOn) eggEls(els, now, light, when);
if (cover !== "none") els.push(film("cl" + cover + light, "cloud_" + cover + "_" + light, 0, 7, 3));
const bump = !f.paused && (Math.floor(now / 240) * 7919) % 13 < 3 ? 1 : 0;
els.push(bitmap("wg" + light, D.wing[light], 46, 7 + bump, 4));
if (light !== "d") {                           // the light at the wing's tip, breathing (red: it is the left-hand wing)
const beat = [40, 110, 200, 255, 200, 110][Math.floor(now / 240) % 6];
els.push(rect("nl", 49, 7 + bump, 1, 1, "#FF4638" + ("0" + beat.toString(16).toUpperCase()).slice(-2), 5));
}
const word = code(f.to) + " " + leftText(fl.left / FAST);
if (light !== "d") {
els.push({ id: "sh", type: "rectangle", x: 0, y: 0, width: smallWidth(word) + 16, height: 6, fill: "gradient_h",
fill_colors: [light === "n" ? "#000000C8" : "#00000078", "#00000000"], border_width: 0, timeout: STILL, z_index: 4 });
}
const tx = 2 + smallWidth(code(f.to) + " "), time = leftText(fl.left / FAST);
els.push(still(text("ws", code(f.to), "small", 3, 0, "#000000A0", "top_left", 5)), still(text("wt", code(f.to), "small", 2, -1, WHITE, "top_left", 6)),
still(text("ls", time, "small", tx + 1, 0, "#000000A0", "top_left", 5)), still(text("lt", time, "small", tx, -1, f.warned ? AMBER : WHITE, "top_left", 6)));
const say = now < toast.until ? toast.word : f.paused && Math.floor(now / 700) % 2 === 0 ? "PAUSED" : "";
if (say) {
els.push(still(text("os", say, "small", 71, 0, "#00000090", "top_right", 7)), still(text("ot", say, "small", 70, -1, AMBER, "top_right", 8)));
}
return tag(els, "w");
}
function groundSkyEls(now, where) {
const i = where === undefined ? st.at : where, sun = sunAt(lat(i), lon(i), now), sky = skyAt(sun[0]);
const grey = cover === "all" ? 0.6 : cover === "some" ? 0.3 : 0;
const dull = (c) => {
let out = "#";
for (let k = 1; k < 7; k += 2) {
const v = parseInt(c.slice(k, k + 2), 16), g = sun[0] > -5 ? 150 : 34;
out += ("0" + Math.round(v + (g - v) * grey).toString(16).toUpperCase()).slice(-2);
}
return out + "FF";
};
const els = [{ id: "sky", type: "rectangle", x: 0, y: 0, width: 72, height: 16, fill: "gradient_v", fill_colors: [dull(sky[0]), dull(sky[1])],
border_width: 0, timeout: STILL, z_index: 0 }];
if (sun[0] < -8 && cover !== "all") els.push(bitmap("st", D.stars[0], 0, 0, 1));
if (sun[0] < -5 && cover !== "all" && moonAt(lat(i), lon(i), now)[0] >= 0) els.push(film("mo", "moon_" + moonPhase(now), 51, 0, 2, false));
return tag(els, "t");
}
function boardEls(now) {
const f = st.fly, fl = flightNow();
const els = [rect("bg", 0, 0, 72, 16, "#000000FF", 0), small("ba", code(f.from), 2, -1, AMBER), small("bb", code(f.to), 70, -1, AMBER, "top_right")];
const x0 = 18, w = 36, done = Math.round(w * fl.part);
const say = now < toast.until ? toast.word : f.paused ? "PAUSED" : "";
if (say) {                                     // (what a press did, or that the flight is paused: in the progress line's place)
els.push(small("ot", say, 36 - (smallWidth(say) >> 1), -1, f.paused && now >= toast.until ? AMBER : WHITE));
} else {
els.push(rect("tr", x0, 2, w, 1, "#32323AFF", 1));
if (done > 0) els.push(rect("dn", x0, 2, done, 1, AMBER, 2));
els.push(bitmap("np", NOSE, x0 + done - 1, 1, 3));
}
els.push(still(text("lt", leftText(fl.left / FAST), "bold", 2, 6, WHITE, "top_left", 3)));
const far = fl.dist * (1 - fl.part), turn = Math.floor(now / 5000) % 2;
let side;
if (turn === 0) {
side = units === "mi" ? Math.round(far * 0.6214) + " MI" : Math.round(far) + " KM";
} else {                                       // when it lands, by the clock of the place it lands at
const land = new Date(now + fl.left / FAST + offMin(f.to) * 60000);        // (a pause moves it)
side = "ARR " + land.getUTCHours() + ":" + pad2(land.getUTCMinutes());
}
els.push(small("sd", side, 70, 8, GREY, "top_right"));
return tag(els, "o");
}
function confirmEls(yes, title) {
const ask = title || "END FLIGHT";
const els = [rect("bg", 0, 0, 72, 16, "#000000FF", 0), small("q", ask, 36 - (smallWidth(ask) >> 1), -1, WHITE)];
els.push(rect("b1", 13, 8, 20, 8, yes ? "#1C1C22FF" : "#3C3C46FF", 1, 2), rect("b2", 39, 8, 20, 8, yes ? "#B4382CFF" : "#2A1614FF", 1, 2),
small("no", "NO", 23 - (smallWidth("NO") >> 1), 8, yes ? GREY : WHITE), small("ye", "YES", 49 - (smallWidth("YES") >> 1), 8, yes ? WHITE : "#C86E5AFF"));
return tag(els, "c");
}
function arrivedEls(i, now) {
const els = [rect("bg", 0, 0, 72, 16, "#060A1AFF", 0)];
if (late > 0 && Math.floor(now / 3000) % 2 === 1) els.push(small("w1", "DELAY " + hm(late), 2, -1, "#FFD21AFF"));
else els.push(small("w1", "WELCOME TO", 2, -1, GREY));
const t = new Date(now + offMin(i) * 60000), clock = t.getUTCHours() + ":" + pad2(t.getUTCMinutes());
const name = cityOf(i), wide = textWidth(name, "bold") <= 58 - smallWidth(clock);       // (with room to spare: the bar's bold runs wide)
if (wide) els.push(still(text("w2", name, "bold", 2, 6, WHITE, "top_left", 3)));
else els.push(small("w2", fit(name, 66 - smallWidth(clock)), 2, 8, WHITE));
els.push(small("w3", clock, 70, 8, AMBER, "top_right"));
return tag(els, "v");
}
function logEls(k) {
const els = [rect("bg", 0, 0, 72, 16, "#000000FF", 0)];
if (!st.log.length) {
els.push(small("l0", "NO FLIGHTS YET", 36 - (smallWidth("NO FLIGHTS YET") >> 1), 4, GREY));
return tag(els, "l");
}
const e = st.log[k], day = new Date(e.t + zoneMs);
els.push(small("l1", MONTHS[day.getUTCMonth()] + " " + day.getUTCDate(), 2, -1, GREY),
small("l2", hm(e.min) + (e.late ? " +" + hm(e.late) : ""), 70, -1, e.late ? "#FFD21AFF" : GREY, "top_right"));
let x = 2;
els.push(still(text("l3", e.fc || code(e.from), "bold", x, 6, AMBER, "top_left", 3)));
x += textWidth(e.fc || code(e.from), "bold") + 2;
els.push(bitmap("l4", NOSE, x, 10, 3));
x += 5;
els.push(still(text("l5", e.tc || code(e.to), "bold", x, 6, AMBER, "top_left", 3)));
els.push(small("l6", (k + 1) + "/" + st.log.length, 70, 8, DIM, "top_right"));
return tag(els, "l");
}
function keys() {
const k = { turn: ctl.turn, ok: ctl.ok, start: ctl.start, back: backs > 0 };
ctl.turn = 0;
ctl.ok = ctl.start = false;
backs = 0;
if (k.turn || k.ok || k.start || k.back) since = Date.now();
if (k.back) wentBack = true;
return k;
}
const waiting = () => ctl.turn !== 0 || ctl.ok || ctl.start || backs > 0;
onBack = () => {                                 // Back ends the app in the hall only; elsewhere it is a step back
if (mode === "lobby") return false;
backs++;
return true;
};
async function askCover(la, lo) {
const got = await getJson("https://api.open-meteo.com/v1/forecast?latitude=" + Math.round(la * 100) / 100 + "&longitude=" +
Math.round(lo * 100) / 100 + "&current=cloud_cover");
const pct = got && got.current ? Number(got.current.cloud_cover) : NaN;
if (pct >= 0) cover = pct < 15 ? "none" : pct < 45 ? "few" : pct < 80 ? "some" : "all";
}
let coverWanted = null;             // [lat, lon]: the place of departure, waiting to be asked for
feeds.push(async (now) => {
if (!weatherOn) return false;
if (coverWanted) {
const at = coverWanted;
coverWanted = null;
await askCover(at[0], at[1]);
return true;
}
if (!st.fly || mode !== "fly") return false;
const key = st.fly.t0 + "";
if (coverFor === key && now - coverAt < 600000) return false;
coverAt = now;
coverFor = key;
const at = along(st.fly.from, st.fly.to, flightNow().part);
await askCover(at[0], at[1]);
return true;
});
let onPage = "", wentBack = false;
async function draw(key, els) {
if (onPage === "" && splashUp) return firstPage(key, els);
if (key === onPage || onPage === "") {
onPage = key;
return show(els);
}
const way = wentBack ? "roll_dn" : "roll_up";
wentBack = false;
onPage = key;
busy = true;
try {
await post([cardAnim("zz_c1", way + "_in", 0)]);                   // at once: the press is answered
const t0 = Date.now(), olds = [], mine = {};
for (let i = 0; i < els.length; i++) mine[els[i].id] = 1;
for (const id of live.keys()) if (!mine[id]) olds.push(id);
const sent = await postAll(els.map((el) => wire(el)));              // the whole page in a few requests, under the blind
await sleep(D.roll - 20 - (Date.now() - t0));
await drop(olds);
if (sent) remember(els);
else await show(els, true);
await post([cardAnim("zz_c2", way + "_out", 0), cardAnim("zz_c1", way + "_in", OFF)]);
await sleep(D.roll + 40);
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ["zz_c1", "zz_c2"] }));
} finally {
busy = false;
ctl.ok = ctl.start = false;                  // a second press while the page was changing is not a press on the new page
}
}
async function wipe(ids) {
await call("DELETE", "display/draw", JSON.stringify({ application_name: APP, element_ids: ids }));
}
let pre = [];
async function premake(els) {
await postAll(els.map((el) => wire(el, OFF, 0)));
await postAll(els.map((el) => wire(el)));
pre = els;
}
async function firstPage(key, els) {
const have = {};
for (let i = 0; i < pre.length; i++) have[pre[i].id] = 1;
remember(pre);
pre = [];
if (els.some((el) => !have[el.id])) await show(els);       // (not quite the page that was made: the rest, still under the film)
onPage = key;
await splashOff();
await show(els);
fillNow();                                     // (a flight was picked up: now the positions of all the airports)
}
const TOP_Z = 2000000000;           // above every page: what covers the screen while a page is exchanged
function over(id, name, z) {
return '{"id":"' + id + '","type":"animation","path":"animations/' + name + '.anim","x":0,"y":0,"align":"top_left","loop":false,' +
'"section":"default","timeout":20,"z_index":' + z + "}";
}
async function printTicket() {
busy = true;
try {
ticketPic = ticketData();
await post([cardAnim("zz_c1", "roll_up_in", 0)]);                  // the page that was there goes behind a blind
const olds = [];
for (const id of live.keys()) olds.push(id);
await sleep(D.roll - 20);
await drop(olds);
const els = ticketEls(false, -72);
await post(els.map((el) => wire(el)));
await post([cardAnim("zz_c2", "roll_up_out", 0), cardAnim("zz_c1", "roll_up_in", OFF)]);
await sleep(D.roll + 40);
await wipe(["zz_c1", "zz_c2"]);
const at = async (x, ms) => {
els[1].x = x;
await post([wire(els[1])]);
await sleep(ms);
};
for (let x = -68; x <= -60; x += 4) await at(x, 30);               // a first bit, quickly
await sleep(250);
for (let x = -59; x <= -42; x++) await at(x, 55);                   // then the printer's slow feed
await sleep(300);
for (let x = -28; x < 0; x += 14) await at(x, 25);                  // and the rest in one go
await at(0, 0);
remember(els);
} finally {
busy = false;
ctl.ok = ctl.start = false;
}
}
async function board(under) {
busy = true;
try {
await post([over("zz_sc", "scan", TOP_Z)]);
await sleep(D.scan + 80);
await wipe(["zz_sc"]);
} finally {
busy = false;
}
const bw = textWidth("BOARDING", "bold"), bx = (72 - (bw + 10)) >> 1;
await draw("board", tag([rect("bg", 0, 0, 72, 16, "#041A0EFF", 0), bitmap("ck", TICK, bx, 4, 2),
still(text("bw", "BOARDING", "bold", bx + 10, 2, WHITE, "top_left", 3)), rect("ln", 0, 15, 72, 1, "#1E6E3CFF", 1)], "g"));
await sleep(1300);
await draw("takeoff", groundSkyEls(Date.now()));  // the sky of the place and the hour ...
busy = true;
try {
await post([over("zz_to", "takeoff", TOP_Z)]);  // ... and over it the runway and the aircraft, until the fuselage
await sleep(D.takeoff + 500);                   // fills the picture: the film holds there
await under();                                  // (unseen, under it: the first page of the flight)
await post([over("zz_wi", "window", TOP_Z + 1)]);       // the same picture again; its window clears and opens
await sleep(250);
await wipe(["zz_to"]);
await sleep(D.opening + 150);
await wipe(["zz_wi"]);
} finally {
busy = false;
ctl.ok = ctl.start = false;
}
}
let logFrom = "lobby";
async function openLog() {
logFrom = mode;
await card("YOUR", "LOGBOOK");
mode = "log";
logPick = 0;
}
let logPick = 0;                    // which flight of the logbook is on show
function cardEls(top, word) {
const els = [rect("bg", 0, 0, 72, 16, "#000000FF", 0), small("c1", top, 36 - (smallWidth(top) >> 1), -1, GREY),
still(text("c2", word, "bold", 36 - (textWidth(word, "bold") >> 1), 6, AMBER, "top_left", 3)),
rect("c3", 0, 15, 72, 1, "#96681AFF", 1)];
return tag(els, "q");
}
async function card(top, word, ms) {
await draw("card " + word, cardEls(top, word));
await sleep(ms || 1100);
ctl.ok = ctl.start = false;
ctl.turn = 0;
backs = 0;
}
async function descent() {
busy = true;
try {
await post([over("zz_ch", "chime", TOP_Z)]);
await sleep(D.chime + 80);
await wipe(["zz_ch"]);
} finally {
busy = false;
ctl.ok = ctl.start = false;
ctl.turn = 0;
}
}
async function step() {
const now = Date.now();
if (mode === "lobby") {
await draw("lobby", lobbyEls());
await nap(whole ? 30000 : 1000);
const k = keys();
if (k.start) return openLog();
if (k.ok) {
flaps.h = "";
hintAt = Date.now() + 500;                 // (counted from when the page is there, behind its blind)
mode = "home";
}
} else if ((mode === "home" || mode === "dest") && finding) {
const to = mode === "dest", label = to ? "TO" : "FROM", f = to ? "d" : "h";
const xs = [TX(label), TX(label) + 9, TX(label) + 18], open = findWord.charAt(findAt) === "-";
const shown = findShown(findWord, findAt, blinkOn);
if (turned) await flip(f, f + "_at", shown, xs, 7, 8, findAt === 0 ? " gg" : findAt === 1 ? "  g" : "");
else flaps[f] = shown;
turned = false;
await draw(mode, findEls(label, findWord, findAt, blinkOn));
if (!waiting()) await nap(open ? 450 : 30000);       // (a turn that came while the tiles flipped is taken now)
blinkOn = open ? !blinkOn : true;
const k = keys(), on = k.ok || k.start;      // (START, "go on", goes on to the next letter as OK does)
if (k.turn) {
const from = open ? (k.turn > 0 ? -1 : 26) : ABC.indexOf(findWord.charAt(findAt));
findWord = findWord.slice(0, findAt) + ABC.charAt(mod(from + k.turn, 26)) + findWord.slice(findAt + 1);
turned = !open;
blinkOn = true;
if (k.ok) ctl.ok = true;                   // pressed in the same breath: it counts for the letter turned to,
if (k.start) ctl.start = true;             // once that letter is on show (the next step)
}
if (k.back) {                                // out of the search: the airport that was chosen stays
finding = false;
flaps[f] = "";
} else if (on && !open && !k.turn && findAt < 2) {
findAt++;
blinkOn = true;
} else if (on && !open && !k.turn) {
const i = await findCode(findWord);
finding = false;
if (i < 0) await card(whole ? "SORRY, NOT FOUND" : "NOT LOADED YET", findWord, 1800);     // and back to the airport it was
else if (!to) {
await need([i]);
st.at = i;
await card("FOUND", findWord, 1200);
} else if (cands.indexOf(i) !== -1) {      // among the airports that far away: the list stands on it
pick = cands.indexOf(i);
await need([i]);
need([cands[mod(pick + 1, cands.length)], cands[mod(pick - 1, cands.length)]]);
await card("FOUND", findWord, 1200);
} else if (i === st.at) await card("YOU ARE HERE", findWord, 1800);
else {                                     // an airport, but not this far away: how far it is
await need([i]);
await card("IT IS " + hm(Math.round(flightMin(km(st.at, i)) / 5) * 5) + " AWAY", findWord, 2200);
}
flaps[f] = "";
}
} else if (mode === "home") {
await flip("h", "h_at", code(st.at), [TX("FROM"), TX("FROM") + 9, TX("FROM") + 18], 7, 8);
const hint = hintNow();
if (hint === undefined && hintUp && onPage === "home") await show(airportEls("FROM", st.at, "", "", null));
hintUp = hint !== undefined;
await draw("home", airportEls("FROM", st.at, "", "", hint));
if (!waiting()) await nap(hint ? 90 : 30000);
const k = keys();
if (k.turn || k.ok || k.start || k.back) hintAt = 0;            // (touched: the city at once)
if (k.turn) {
st.at = mod(st.at + k.turn * (Math.abs(k.turn) > 2 ? 4 : 1), N);                  // (spun quickly: in bigger steps)
await need([st.at]);
}
if (k.back) mode = "lobby";
else if (k.start) {                          // START: on to the next page
mode = "time";
save();
} else if (k.ok) await openFind();           // OK: look an airport up by its three letters
} else if (mode === "time") {
await flip("m", "m_tt", clock4(minutes), TIME_X, 4, 8);
await draw("time", timeEls());
if (reachKey !== st.at + ":" + minutes) {    // the wheel rests: which airports are that far is worked out now,
await nap(250);                            // not when OK is pressed
if (!waiting()) {
const t0 = Date.now(), got = await reach(st.at, minutes);
if (got) need(got.slice(0, 2));          // (and the first ones' names are fetched)
await tr("reach ahead " + (Date.now() - t0) + "ms " + (got ? got.length : "given up"));
}
}
if (!waiting()) await nap(30000);
const k = keys();
if (k.turn) {
let at = 0;
while (at < STEPS.length - 1 && STEPS[at] < minutes) at++;
minutes = STEPS[Math.max(0, Math.min(STEPS.length - 1, at + k.turn))];
}
if (k.back) {
mode = "home";
hintAt = Date.now() + 500;
}
else if (k.start || k.ok) {                  // START goes on; so does OK here - there is nothing to look up by letters
const t0 = Date.now();
await show(timeEls(true));                 // at once: the press is answered, the dots run while the app counts
cands = await reach(st.at, minutes, true);
pick = 0;
await need([cands[0]]);
await tr("reach " + (Date.now() - t0) + "ms " + cands.length);
await show(timeEls(cands.length));
await sleep(450);
need([cands[1], cands[cands.length - 1]]);                 // (the neighbours: fetched while the first is read)
flaps.d = "";                              // (the first destination is simply there: nothing to flip from)
hintAt = Date.now() + 500;
mode = "dest";
}
} else if (mode === "dest") {
const i = cands[pick];
await flip("d", "d_at", code(i), [TX("TO"), TX("TO") + 9, TX("TO") + 18], 7, 8);
const hint = hintNow();
if (hint === undefined && hintUp && onPage === "dest") await show(airportEls("TO", i, hm(Math.round(flightMin(km(st.at, i)) / 5) * 5), "", null));
hintUp = hint !== undefined;
await draw("dest", airportEls("TO", i, hm(Math.round(flightMin(km(st.at, i)) / 5) * 5), "", hint));
if (!waiting()) await nap(hint ? 90 : 30000);
const k = keys();
if (k.turn || k.ok || k.start || k.back) hintAt = 0;            // (touched: the city at once)
if (k.turn) {
const dir = k.turn > 0 ? 1 : -1;
pick = mod(pick + k.turn, cands.length);
await need([cands[pick]]);
need([cands[mod(pick + dir, cands.length)], cands[mod(pick + 2 * dir, cands.length)]]);   // (the next ones, ahead of the wheel)
}
if (k.back) mode = "time";
else if (k.ok && !k.start) await openFind(); // OK: look one of them up by its three letters
else if (k.start) {                          // START: on to the next page
mode = "ready";
since = Date.now();
if (weatherOn && !D.noWeather) {           // the weather where the flight starts: asked for now, so that the sky
coverAt = Date.now();                    // is right before the take-off, not a moment after it
coverFor = "next";
askCover(lat(st.at), lon(st.at)).catch(() => errs.net++);
}
}
} else if (mode === "ready" || mode === "ticket") {
const wait = D.fast ? 1200 : 3500, hint = now - since >= wait;        // the ripple: once nothing has been touched for a while
await draw(mode, mode === "ready" ? readyEls(hint) : ticketEls(hint));
await nap(hint ? 30000 : wait - (now - since) + 30);
const k = keys();
if (k.back) {
if (mode === "ready") hintAt = Date.now() + 500;
mode = mode === "ready" ? "dest" : "ready";
}
else if (k.start || k.ok) {
if (mode === "ready") {
if (coverFor !== "next" || Date.now() - coverAt > 600000) coverWanted = [lat(st.at), lon(st.at)];    // (not asked for yet)
await printTicket();
onPage = "ticket";
mode = "ticket";
since = Date.now();
} else {
await board(async () => {
st.fly = { from: st.at, to: cands[pick], fc: code(st.at), tc: code(cands[pick]), t0: Date.now(), min: minutes };
if (coverFor === "next") coverFor = st.fly.t0 + "";   // (the sky asked for before the take-off stays for ten minutes)
save();
mode = "fly";
await wipeAfterTakeoff();
});
since = Date.now();
}
}
} else if (mode === "fly") {
const fl0 = flightNow();
if (splashUp) await draw("fly0", windowEls(now));
if (fl0.left <= 0) return arrive();
if (!st.fly.warned && !st.fly.paused && fl0.left <= Math.min(900000, fl0.total / 4)) {
st.fly.warned = 1;
save();
await descent();
since = Date.now();
return;
}
const page = locked ? lockPage : Math.floor((now - since) / PAGE_MS) % 2;
lockPage = page;
await draw("fly" + page, page ? boardEls(now) : windowEls(now));
await nap(page ? 1000 - now % 1000 + 20 : st.fly.paused ? 700 : 240);
const k = keys();
if (k.back) {
mode = "confirm";
pick = 0;
} else if (k.ok) {
locked = !locked;
toast = { word: locked ? "LOCKED" : "AUTO", until: Date.now() + 1800 };
since = Date.now() - page * PAGE_MS;
} else if (k.turn) {
lockPage = 1 - page;
since = Date.now() - lockPage * PAGE_MS;
} else if (k.start) {                        // the top button: the flight is paused / goes on
const f = st.fly, t = Date.now();
if (f.paused) {
f.held = (f.held || 0) + (t - f.paused);
f.paused = 0;
} else {
f.paused = t;
}
save();
since = t - page * PAGE_MS;
}
} else if (mode === "confirm") {
await draw("confirm", confirmEls(pick === 1));
await nap(15000);
const k = keys();
if (k.turn) pick = pick ? 0 : 1;
if (k.back || (k.ok && pick === 0) || (!k.turn && !k.ok && Date.now() - since > 14000)) {
mode = "fly";
since = Date.now();
} else if (k.ok) {                           // ended early: back where it started, nothing in the logbook
st.fly = null;
locked = false;
save();
mode = "lobby";
}
} else if (mode === "arrived") {
await draw("arrived", arrivedEls(st.at, now));
await nap(late > 0 ? 3000 - now % 3000 + 20 : 20000);
const k = keys();
if (k.ok || k.start || k.back || k.turn || Date.now() - since > 120000) mode = "lobby";
} else if (mode === "log") {
const e = st.log[logPick];
if (e && !(e.fc && e.tc)) await need([e.from, e.to]);        // (flights of older versions: kept without their letters)
await draw("log", logEls(logPick));
await nap(30000);
const k = keys();
if (k.turn && st.log.length) logPick = mod(logPick + k.turn, st.log.length);
if (k.ok || k.back || k.start) {             // and back to the page it was opened from
await card("BACK TO", "CHECK-IN");
mode = logFrom;
}
}
}
let late = 0;                       // the delay of the flight that has just landed, in minutes
let locked = false, lockPage = 0;    // a flight's page stays (the wheel's press), and which one is on show
async function putUnder(key, els) {
const olds = [], mine = {};
for (let i = 0; i < els.length; i++) mine[els[i].id] = 1;
for (const id of live.keys()) if (!mine[id]) olds.push(id);
const sent = await postAll(els.map((el) => wire(el)));
await drop(olds);
if (sent) remember(els);
else await show(els, true);
onPage = key;
}
function wipeAfterTakeoff() {                    // under the take-off's film: its sky turns into the first page of the flight
return putUnder("fly0", windowEls(Date.now()));
}
async function arrive() {
const f = st.fly;
late = Math.round((f.held || 0) * FAST / 60000);        // minutes it was paused for: the flight's delay
st.log.unshift({ from: f.from, to: f.to, fc: code(f.from), tc: code(f.to), t: f.t0, min: f.min, late: late });
if (st.log.length > 60) st.log.length = 60;
st.at = f.to;
st.fly = null;
locked = false;
await save();
busy = true;
try {
await post([over("zz_cl", "closing", TOP_Z)]);
await sleep(D.opening + 500);
await putUnder("landing", groundSkyEls(Date.now(), st.at));
await post([over("zz_ld", "landing", TOP_Z + 1)]);
await sleep(250);
await wipe(["zz_cl"]);
await sleep(D.landing + 150);
} finally {
busy = false;
}
mode = "arrived";
since = Date.now();
await draw("arrived", arrivedEls(st.at, Date.now()));
await wipe(["zz_ld"]);
ctl.ok = ctl.start = false;
ctl.turn = 0;
backs = 0;
}
const choosingNow = () => mode === "lobby" || mode === "home" || mode === "time" || mode === "dest";
async function tr(step) {
if (D.trace) await call("POST", "storage/write?path=/ext/data/trace.txt&append=1", step + " " + Date.now() + "\n", "application/octet-stream");
}
async function main() {
await splash(TOP_Z + 5);                       // the author's mark: all that follows is got ready while it plays
await tr("main");
await syncTime();
await tr("time");
await readSettings();
settingsDue = Date.now() + 5000;
await tr("settings");
await openAirports();
await load();
const fresh = resetWanted();                   // "Start over" was flipped while the app was closed
if (fresh) await clearAll();
if (!st.fly) fillNow();                        // (a flight that is picked up: after its first page)
await tr("airports");
await need([st.at].concat(st.fly ? [st.fly.from, st.fly.to] : []));
const settle = async (i, letters) => {
if (!letters || code(i) === letters) return i;
const now = await findCode(letters);
if (now < 0) return i;
await need([now]);
return now;
};
st.at = await settle(st.at, st.code);
if (st.fly) {
st.fly.from = await settle(st.fly.from, st.fly.fc);
st.fly.to = await settle(st.fly.to, st.fly.tc);
await geoOf([st.fly.from, st.fly.to]);      // (a flight is picked up: its two airports' positions, at once)
}
await tr("names");
if (st.fly) {
mode = "fly";
cands = [st.fly.to];
minutes = st.fly.min;
}
await premake(fresh ? cardEls("START OVER", "CLEARED") : !whole && !st.fly ? cardEls("MORE AIRPORTS", "LOADING")
: st.fly ? windowEls(Date.now()) : lobbyEls());
await splashEnd();                             // the film has played: the first page goes under it (firstPage)
keys();                                        // (whatever was pressed during it counts for nothing)
if (stopped) return;                           // (Back, in the hall's way: the app ends)
if (fresh) await card("START OVER", "CLEARED", 1500);
if (!whole && !st.fly) await card("MORE AIRPORTS", "LOADING", 1800);   // just installed: the built-in ones now, the rest is on its way
since = Date.now();
await tr("loop");
dataLoop();
while (!stopped) {
try {
if (resetWanted()) await startOver();      // "Start over" was flipped in the settings
if (wholeReady && !whole) {                // the airports' files have all arrived: from now on, all the airports
wholeReady = false;
if (!(await loadGeo())) fetchAirports();
else {
reachKey = "";
if (choosingNow()) await card("ALL AIRPORTS", "READY", 1600);
}
}
if (apFailed && !whole && choosingNow()) {  // no answer from the internet: said once, the app goes on with what it has
apFailed = false;
await card("NO INTERNET", N + " ONLY", 1800);
}
await step();
} catch (err) {
report("flight", err);
await sleep(500);
}
}
}
main();
})();
