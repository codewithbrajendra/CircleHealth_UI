import { Prompt } from "react-router";

const Example = () => (
  <>
    <Prompt
      //when={shouldBlockNavigation}
      onConfirm={() => alert("ok")}
      onCancel={() => alert("no")}
      message="You have unsaved changes, are you sure you want to leave?"
    />
  </>
);

export default Example;
