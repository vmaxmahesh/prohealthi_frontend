import React from "react";

const CreateTextWithProps = ({ text, ASCIIChar, ...props }) => {
 return (
   <span {...props}>
    {text}{ASCIIChar}
   </span>
)
};

const RepeatCharacters = ({ times, children }) => {
 return React.cloneElement(children, {
   // This will override the original ASCIIChar in the text.
   ASCIIChar: children.props.ASCIIChar.repeat(times),
})
};

function App() {
 return (
   <div>
     <RepeatCharacters times={10}>
       <CreateTextWithProps
         text="Habdul Hazeez"
         ASCIIChar=' @ '
         />
     </RepeatCharacters>
   </div>
)
}

export default App