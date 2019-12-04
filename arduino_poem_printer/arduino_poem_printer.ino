/*------------------------------------------------------------------------
  Example sketch for Adafruit Thermal Printer library for Arduino.
  Demonstrates a few text styles & layouts, bitmap printing, etc.

  IMPORTANT: DECLARATIONS DIFFER FROM PRIOR VERSIONS OF THIS LIBRARY.
  This is to support newer & more board types, especially ones that don't
  support SoftwareSerial (e.g. Arduino Due).  You can pass any Stream
  (e.g. Serial1) to the printer constructor.  See notes below.

  You may need to edit the PRINTER_FIRMWARE value in Adafruit_Thermal.h
  to match your printer (hold feed button on powerup for test page).
  ------------------------------------------------------------------------*/

#include "Adafruit_Thermal.h"
#include "Keyboard.h"
//#include "Console.h"

// Here's the new syntax when using SoftwareSerial (e.g. Arduino Uno) ----
// If using hardware serial instead, comment out or remove these lines:

#include "SoftwareSerial.h"
#define TX_PIN 6 // Arduino transmit  YELLOW WIRE  labeled RX on printer
#define RX_PIN 5 // Arduino receive   GREEN WIRE   labeled TX on printer

SoftwareSerial mySerial(RX_PIN, TX_PIN); // Declare SoftwareSerial obj first
Adafruit_Thermal printer(&mySerial);     // Pass addr to printer constructor
// Then see setup() function regarding serial & printer begin() calls.

// -----------------------------------------------------------------------

int incomingByte;

char *poems[] = {"Icy wintertime\nbefore a bright\ncrazed eye sinks into the\nchocolate\n\n", 
"I love my chocolate\nImpatient and attractive.\nShe has two cute eyes\nA passionate attitude\nWhen she soars I feel dead\ninside\n\n", 
"Sunflowers reach,\nUp to the skies,\nRice is brown,\nAnd so are your eyes.\nFoxgloves in hedges,\nSurround the farms,\nMy bath is warm,\nAnd so are your arms.\nDaisies are pretty,\nDaffies have style,\nYour beauty is dazzling,\nAnd so is your smile.\nEyes are beautiful,\nJust like you.\n",
"Pleasant summertime\nFor a western, bold sky swims\nnear the sapphire\n\n",
"Looks like the sky on a summer day\nThe ocean's gentle waves/nA fish jumping in a lake\nA runner crossing the finish line\nA juicy blueberry that bursts in my mouth\nFeels like a listening to a sad song\nA day when I am alone.\n\n"};


void setup() {

  // This line is for compatibility with the Adafruit IotP project pack,
  // which uses pin 7 as a spare grounding point.  You only need this if
  // wired up the same way (w/3-pin header into pins 5/6/7):
  pinMode(7, OUTPUT); digitalWrite(7, LOW);

  // NOTE: SOME PRINTERS NEED 9600 BAUD instead of 19200, check test page.
  mySerial.begin(9600);  // Initialize SoftwareSerial
  //Serial1.begin(19200); // Use this instead if using hardware serial
  printer.begin();        // Init printer (same regardless of serial type)

  printer.setLineHeight(50);
  printer.println("Printer is on");
//printer.println("I love my chocolate\nImpatient and attractive.\nShe has two cute eyes\nA passionate attitude\nWhen she soars I feel dead\ninside\n\n");

  printer.sleep();      // Tell printer to sleep
  delay(3000L);         // Sleep for 3 seconds
  printer.wake();       // MUST wake() before printing again, even if reset
  printer.setDefault(); // Restore printer to defaults
}


void loop() {
  if (Serial.available() > 0) {
  incomingByte = Serial.read();
  }
}
