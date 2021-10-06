import Enzyme, { mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { expect } from "chai";

import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

//todo more manual use cases, unit test, graph using the json
const emergencyPath = [
  "is_heartburn_known_no",
  "heartburn_weekly_burns_4_to_7",
  "heartburn_weekly_gastric_4_to_7",
  "heartburn_weekly_pain_4_to_7",
  "heartburn_weekly_nauseus_4_to_7",
  "heartburn_weekly_sleep_4_to_7",
  "heartburn_swallowing_yes",
  "heartburn_blood_stool_yes",
  "heartburn_lost_weight_yes",
];

test("emergency", () => {
  const questionnaire = mount(<App />);
  for (const id of emergencyPath) {
    questionnaire.find("#" + id).simulate("click");
    questionnaire.find("#next").simulate("click");
  }
  expect(
    questionnaire.contains(
      <p>
        Your symptom description indicates that you are in need of URGENT
        medical care. Go directly to the nearest emergency room. If you are
        unable to do so, call an ambulance.
      </p>
    )
  ).to.equal(true);
});
