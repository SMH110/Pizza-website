import { expect } from "chai";
import { isPostcodeWithinDeliveryArea } from "../../../shared/validation/delivery-area-validator";

describe("Delivery Area Validator", function() {
  it("Given an invalid value, should return false", () => {
    expect(isPostcodeWithinDeliveryArea("")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("  ")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea(null)).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea(undefined)).to.be.equal(false);
  });

  it("Given a valid full postcode (with or without space, variable casing) that is not within the delivery areas, should return false", () => {
    expect(isPostcodeWithinDeliveryArea("Aa71 2SP")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("sw11 9jl")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("SE6 5AA")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("Aa712SP")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("sw119jl")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("SE65AA")).to.be.equal(false);

    // A postcode that looks like a delivery area (SW2) but is actually a different area (SW20)
    expect(isPostcodeWithinDeliveryArea("SW20 8DA")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("SW208DA")).to.be.equal(false);

    // A postcode that looks like a delivery area (SE19) but is actually a different area (SE1)
    expect(isPostcodeWithinDeliveryArea("SE1 9DA")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("SE19DA")).to.be.equal(false);
  });

  it("Given a valid full postcode (with or without space, variable casing) that is within the delivery areas, should return true", () => {
    // Uppercase with space
    expect(isPostcodeWithinDeliveryArea("CR7 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE15 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE19 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE21 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE22 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE23 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE24 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE26 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE27 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE5 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW12 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW16 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW17 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW2 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW4 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW8 1AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW9 1AB")).to.be.equal(true);

    // Uppercase without space
    expect(isPostcodeWithinDeliveryArea("CR71AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE151AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE191AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE211AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE221AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE231AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE241AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE261AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE271AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE51AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW121AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW161AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW171AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW21AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW41AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW81AB")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW91AB")).to.be.equal(true);

    // Lowercase with space
    expect(isPostcodeWithinDeliveryArea("cr7 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se15 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se19 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se21 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se22 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se23 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se24 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se26 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se27 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se5 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw12 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw16 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw17 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw2 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw4 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw8 1ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw9 1ab")).to.be.equal(true);

    // Lowercase without space
    expect(isPostcodeWithinDeliveryArea("cr71ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se151ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se191ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se211ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se221ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se231ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se241ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se261ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se271ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se51ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw121ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw161ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw171ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw21ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw41ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw81ab")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw91ab")).to.be.equal(true);
  });

  it("Given a valid outcode (variable casing) that is not within the delivery areas, should return false", () => {
    expect(isPostcodeWithinDeliveryArea("Aa71")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("sw11")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("SE6")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("Aa71")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("sw11")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("SE6")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("SE1")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("SW1")).to.be.equal(false);
    expect(isPostcodeWithinDeliveryArea("SW20")).to.be.equal(false);
  });

  it("Given a valid postcode with extra spaces that is within the delivery areas, should return true", () => {
    // Uppercase
    expect(isPostcodeWithinDeliveryArea("SE19 1DZ ")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea(" SE19 1DZ")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea(" SE19 1DZ ")).to.be.equal(true);
  });

  it("Given a valid outcode (variable casing) that is within the delivery areas, should return true", () => {
    // Uppercase
    expect(isPostcodeWithinDeliveryArea("CR7")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE15")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE19")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE21")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE22")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE23")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE24")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE26")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE27")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SE5")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW12")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW16")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW17")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW2")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW4")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW8")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("SW9")).to.be.equal(true);

    // Lowercase
    expect(isPostcodeWithinDeliveryArea("cr7")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se15")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se19")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se21")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se22")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se23")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se24")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se26")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se27")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("se5")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw12")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw16")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw17")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw2")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw4")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw8")).to.be.equal(true);
    expect(isPostcodeWithinDeliveryArea("sw9")).to.be.equal(true);
  });
});
