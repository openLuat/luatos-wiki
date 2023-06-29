# Technical index

- Maximum measurement range: voltage up to 24V, current up to 5A
- Use 0.4% ±20ppm precision reference chip, reserved 0.1% reference position, 0.1% precision resistor, 12-bit ADC design. Nominal accuracy of 1% (typical value 0.5%), user can further calibrate the accuracy to 0.1%.
- Automatic measurement range: current return display gears are 500μA, 50mA, 5A three gears, according to the current output current automatically switch.
- Gear switching speed: CC meter adopts multi-channel synchronous sampling, no gear switching delay.
- Voltage drop switching speed: CC meter adopts 2/3 channel sampling resistor, the maximum delay of sampling resistor being short-circuited is 100uS
- Current measurement accuracy: 0.15μA resolution at 500μA gear, 100μA resolution at 50mA gear (table below)
- Fixed multi-channel 10KHz sampling rate, USB high-speed data transmission
- Can be used with a PC client to view and analyze the current waveform, but also can use the command line version on any device (win/linux/mac) to capture the serial data (such as Raspberry Pi), using the PC client to import view

|       Type       | Range  | Resolution | Nominal Accuracy |    Actual Accuracy    |
| :--------------: | :----: | :--------: | :--------------: | :-------------------: |
| Voltage Setting  | 0V-21V |    20mV    |        2%        | PD Decoy PPS Decision |
| Voltage Readback | 0V-24V |    10mV    |        1%        |         <0.5%         |
| Current Setting  |  0-3A  |    50mA    |        2%        | PD Trick PPS Decision |

| Current Range |    Range    | Resolution | Nominal Accuracy | Actual Accuracy |    Type    |
| :-----------: | :---------: | :--------: | :--------------: | :-------------: | :--------: |
|     500μA     | 0.1uA-500μA |   0.15μA   |        1%        |      <0.5%      | Auto-range |
|     50mA      | 500μA-50mA  |    15μA    |        1%        |      <0.5%      | Auto-range |
|      5A       |   50mA-5A   |   1.5mA    |        1%        |       <1%       | Auto-range |
