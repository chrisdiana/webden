export const helpTemplate = `
  <div class="popup popup-swipe-to-close">
    <div class="page">
      <div class="navbar">
        <div class="navbar-inner">
          <div class="title">Help</div>
          <div class="right">
            <a class="link popup-close" href="#">
              <i class="fas fa-times"></i>
            </a>
          </div>
        </div>
      </div>
      <div class="page-content">
        <div class="block">
          <h2>Keyboard Shortcuts</h2>
          <div class="data-table card">
            <table>
              <thead>
                <tr>
                  <th class="label-cell">Shortcut</th>
                  <th class="label-cell">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="label-cell">Ctrl-S / Cmd-S</td>
                  <td class="label-cell">Save current project</td>
                </tr>
                <tr>
                  <td class="label-cell">Ctrl-K / Cmd-K</td>
                  <td class="label-cell">Open project</td>
                </tr>
                <tr>
                  <td class="label-cell">Shift-Option-] / Shift-Option-[</td>
                  <td class="label-cell">Switch between editor tabs</td>
                </tr>
                <tr>
                  <td class="label-cell">Ctrl-F / Cmd-F</td>
                  <td class="label-cell">Find and replace</td>
                </tr>
                <tr>
                  <td class="label-cell">Ctrl-H</td>
                  <td class="label-cell">Open help</td>
                </tr>
                <tr>
                  <td class="label-cell">F1</td>
                  <td class="label-cell">Open command pallete</td>
                </tr>
                <tr>
                  <td class="label-cell">Ctrl-alt-h / Cmd-alt-h</td>
                  <td class="label-cell">Keyboard shortcuts</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr>

          <h2>How to install</h2>
          <ul>
            <li>
              <p><b>iOS Safari</b></p>
              <p><i>Go to Share Menu > Add to Home Screen</i></p>
            </li>
            <li>
              <p><b>Chrome</b></p>
              <p><i>Go to Settings > Add to Home Screen</i></p>
            </li>
          </ul>

          <h2>How to use libraries or frameworks</h2>
          <p>Add any scripts to the HTML tab as you would in a HTML file.</p>

          <hr>

          <h2>iOS Troubleshooting</h2>
          <ul>
            <li>
              <p><b>Disable Smart Punctuation</b></p>
              <p>New iOS versions replace straight quotes curved quotes which can mess things up in the editor. In order to fix this
                you will need to disable smart punctuation.</p>
              <p><i>Go to Settings > General > Keyboard > Smart Punctuation</i></p>
            </li>
            <li>
              <p><b>Copy/paste limitations</b></p>
              <p>Currently, Ace Editor does not support native context menu copy/paste functionality in mobile iOS Safari. You can copy/paste if using
                an external keyboard but in order to work around this, there are copy and paste buttons in the side panel.</p>
              <p><i>To copy: Select any text inside (or outside) of the app and click the copy button.</i></p>
              <p><i>To paste: With copied text in the clipboard, select the paste button and paste the content into the text area.
                    The content will be pasted into the editor where the cursor is.</i></p>
            </li>
            <li>
              <p><b>Download limitations in iOS standalone mode</b></p>
              <p>Currently, iOS Safari does not yet support the HTML download attribute when in standalone mode. This means if you
                install the app to the home screen, you will only be able to import projects and not export. If this angers you as much
                as it does me and many others, <a href="https://bugs.webkit.org/show_bug.cgi?id=167341" target="_blank">ask Apple</a>
                to impliment it sometime in the near future.
            </li>
          </ul>

          <hr>

          <p>webden.dev &copy; ${new Date().getFullYear()} - Source on <a href="#" target="_blank">Github</a></p>
        </div>
      </div>
    </div>
  </div>
`;
