import React from 'react'
import SelectBox from './components/SelectBox'

const INIT_LABEL = "Task Status"
const INIT_OPTIONS = [
  { name: "Option 1 lorem ipsum dolor sit amet", color: "#26d2ac" },
  { name: "Option 2 lorem ipsum", color: "#268bd2" },
  { name: "Option 3", color: "#26d24c" },
  { name: "Option 4", color: "#9ed226" },
  { name: "Option 5 lorem ipsum dolor sit amet", color: "#9ed226" },
  { name: "Option 6", color: "#9cd246" },
  { name: "Option 7", color: "#9ed236" },
  { name: "Option 8", color: "#8ad236" },
  { name: "Option 9", color: "#2bd236" }
]

const App = () => {
  return (
    <React.Fragment>
      <div className="wrapper">
        <SelectBox options={INIT_OPTIONS} label={INIT_LABEL} selected={0} />
      </div>

      <a id="link" href="https://github.com/halitipek/select-box" target="_blank" rel="noopener noreferrer">
        <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="Github"/>
        <span>Github Repo</span>
      </a>
    </React.Fragment>
  )
}

export default App
