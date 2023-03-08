
# IoT Power User Guide

## Overview

IOT Power is a full-featured, stable and reliable small handheld power meter. It can be powered through USB Type-C interface. The output voltage and current is adjustable, and it supports up to 5V2A. Overall, it is a perfect and helpful test tool for engineers in daily work.

## Technical Characteristics

- Maximum Output Range：voltage up to 5V, current up to 2A (Power Supply should meet certain requirements)
- Voltage Measurement Precision：1% (norminal)
- Measurement Range:  4 groups of range 200μA, 2mA, 200mA, 2A and automatic switch depending on the actual current value (except that 200μA needs manual operation)
- Range Switching Duration：≥ 40us (automatic mode)
- Current Measurement Resolution: 0.5μA at 200μA range, resolution 1μA at 2mA range (for details, refer to the section of "Technical Index")
- Sampling Rate: 10KHz
- Full-featured PC Client (Windows):  real-time data capture, graphical display, analysis and save
- Command Line Tools (Windows/Linux/Mac): real-time data capture (data can be imported to PC Client for further processing) 

## Technical Index

|**Function**|**Range**|**Resolution**|**Nominal Precision**|**Actual Precision**|
| :-: | :-: | :-: | :-: | :-: |
|Output Voltage Setting|0 ~ 5V|1mV|1%|< 0.5%|
|Voltage Read-back|0 ~ 5V|1mV|1%|< 0.5%|
|Output Current Setting|0 ~ 2mA|1μA|1%|< 0.5%|
|Output Current Setting|0 ~ 2A|1mA|1%|1%|

|**Max. Actual Current**|**Measurement Range**|**Resolution**|**Nominal Precision**|**Actual Precision**|**Switch Mode**|
| :-: | :-: | :-: | :-: | :-: | :- |
|200μA|0 ~ 200μA|0.5μA|1%|< 0.5%|Manual|
|2mA |200μA ~ 2mA|1μA|1%|< 0.5%|Automatic|
|200mA|2mA ~ 200mA|1mA|1%|< 0.5%|Automatic|
|2A|200mA ~ 2A|10mA|1%|1%|Automatic|

## Attention

- The maximum output voltage and current of IoT Power are limited by the voltage and current supply at the USB input interface. If the input voltage and current supply is less than 5.5V & 2A, then the maximum output voltage and current will decrease accordingly.
- Please don't supply over 5.8V at the USB port
- Due to its limited size, IOT Power may be very hot when the difference between input and output voltage is large and the output current is high simultaneously. It is highly recommended not to use the device with the current exceeding 1.2A for a long time
- IOT Power is mainly used to measure battery-powered devices. Therefore, please don't connect the tool to any device with over 4.2V power supply, in order to avoid any unnecessary loss.
- Be careful to use mobile phone power supply to power IoT Power.  It's been noticed that some USB chargers, such as Xiaomi and Huawei, may supply over 5.8V voltage because of their private fast-charging protocols, which in turn burns out the tool instantly.

```{warning}
⚠Warning: short circuit at the output terminal, and surge at the input terminal or output terminal may damage the device. 
```

## Equipment Structure

![设备图](overview.png)

|**Label No.**|**Short Press**|**Long Press**|**Scroll**|
| :-: | :-: | :-: | :-: |
|1|Cursor left |Zero Calibration|n/a|
|2|Cursor right|Manual switch mode|n/a|
|3|Switch between "volSet", "curSet" and "NRG/Cap/Pwr Val" fields|Switch between A and mA|Value adjust|
|4|Power on/off|Enable charging mode(Language switch with the key pressed and held while power on)||

⑤: Power output negative pole  
⑥: Power output positive pole

## Instructions for Use

### Voltage Setting

- Move the cursor to the field of "setVol" by short press ③ multiple times
- Use ① and ② to move the cursor to the number to be modified
- Scroll ③ to adjust the value  

Note: the display of the read-back voltage is inaccurate when the output is not loaded.  

### Maximum Output Current Setting

- Move the cursor to the field of "setCur" by short press ③ multiple times
- Long press ③ to switch between mA and A scales if needed
- Use ① and ② to move the cursor to the number to be modified
- Scroll ③ to adjust the value

### Turn the Output on/off (switch between standby and normal mode)

- In standby mode, the device has no output and the status field in the upper left corner displays "STBY".
- Short press ④ to switch the device to normal mode, indicating output is enabled; the status field in the upper-left corner changes to "NORM"
- Short press ④ again to return to "STBY" mode (standby mode).
- In standby mode, long press ④ will move the device to "BATT" mode, which can provide charging service if the rechargeable battery is connected.

### Zero Calibration

- Ensure no external devices is connected
- Short press ④ to switch to normal mode to turn on the output
- Long press ① to measure current noise floor and finish zero calibration

### Switch the Display of output Energy(NRG), Capacity(CAP), and Power (PWR)

- Move the cursor to the field of "NRG/CAP/PWR" by short press ③ multiple times
- Scroll ③ to change the mode between "Energy"(NRG), "Capacity"(CAP), and "Power"(PWR)
- The calculated results will display accordingly in the lower-right field.

```{note}
"Energy"/NRG means the accumulated output power consumption (unit: μWh) that the tool has produced since its last power on.  
"Capacity"/CAP means the accumulated output electrical power (unit: mAh) that the tool has produced since its last power on.  
"Power"/PWR means instantaneous output power.
```

### Manual Range Switch

- Long press ② to manually switch between  200uA, 2mA, 200mA, and 2A
- Return to automatic mode by turning the output off and on again

### Firmware Upgrade

- Click the "Manual Upgrade" button in PC Client

NOTICE：each device is calibrated in production and associated parameters are saved. Please don't erase the data, or face the consequences at your own risk.

## Q&A

1. What's Constant Voltage (CV) and Constant Current (CC)?

**Answer** In CV mode, the device provides constant voltage to load regardless of variations or changes in the load resistance (short circuit is prohibited); In CC mode, the device provides constant current to load regardless of variations or changes in the load resistance (open circuit is not applicable). The device works in CV mode by default.

2. The read-back voltage data is higher than the setting value when there is no load at the output

**Answer** it is normal and expected. The output of IoT Power works in high impedance mode and will not pro-actively discharge at the load end. The read-back data will drop to targeted value if the load is connected.

3. The actual voltage and current output is not stable when the target output voltage is set to 5V

**Answer** it is normal and expected, and please check the power supply at the USB interface. Most PC and USB adapters can't provide stable voltage output of 5V and the output fluctates within 5V + 5% range. Therefore, the output of IoT Power fluctates accordingly as well. It's recommended to set the maximum voltage no higher than 4.8V if it's powered by PC or USB adapter.
