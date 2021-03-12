import "./App.css";
import "@royalnavy/css-framework/dist/styles.css";
import { Button, CheckboxEnhanced, TextInput } from "./components/index.ts";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <div className="App">
        <header className="App-header">
          <h1>Test App</h1>
        </header>
      </div>

      <div className="form">
        <form>
          <CheckboxEnhanced
            class="checkbox"
            variant="primary"
            data-cy="contacted-by-email"
            name="contacted-by-email"
            label="Would you like to be contacted by email?"
            value="true"
          />
          <CheckboxEnhanced
            variant="primary"
            data-cy="Contacted-by-telephone"
            name="Contacted-by-telephone"
            label="Would you like to be contacted by phone?"
            value="false"
          />
          <TextInput
            autoFocus
            className="is-valid"
            data-cy="first-name"
            name="colour"
            label="First Name"
          />
          <TextInput
            name="name"
            data-cy="surname"
            label="Surname"
          />
          <TextInput data-cy="email-field" name="hero" label="Email"  type="email"/>
          <TextInput
            data-cy="telephone-number"
            name="telephone-number"
            label="Telephone number"
            type="tel"
          />
          <CheckboxEnhanced
            variant="primary"
            data-cy="Terms-and-Conditions"
            name="Terms-and-Conditions"
            label="Terms and Conditions"
            value="true"
            description="by checking this box you are agreeing to our terms and conditions"
          />
          <Button type="submit" variant="primary">
            Submit
          </Button>
        </form>
      </div>
    </Fragment>
  );
}

export default App;
