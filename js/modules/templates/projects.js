import { getDateTimeStr } from '../utils.js';

function projectTemplate(project) {
  return `
    <tr onclick="app.openProject('${project.uuid}')">
        <td class="label-cell">${project.name}</td>
        <td class="label-cell">${project.description}</td>
        <td class="label-cell">${new Date(project.created).toDateString()}</td>
        <td class="label-cell">${new Date(project.updated).toDateString()}</td>
        <td class="label-cell">
          <a href="#" onclick="app.ui.deleteProjectConfirm('${project.name}', '${project.uuid}', event)">
            <i class="fas fa-trash"></i>
          </a>
        </td>
      </tr>
    `;
}

export function projectsTemplate() {
  return `
    <div class="popup popup-swipe-to-close">
        <div class="page">
          <div class="navbar">
            <div class="navbar-inner">
              <div class="title">Open Project</div>
              <div class="right">
                <a class="link popup-close" href="#">
                  <i class="fas fa-times"></i>
                </a>
              </div>
            </div>
          </div>
          <div class="page-content">
            <div class="data-table">
              <table>
                <thead>
                  <tr>
                    <th class="label-cell">Name</th>
                    <th class="label-cell">Description</th>
                    <th class="label-cell sortable-cell">Created</th>
                    <th class="label-cell sortable-cell">Last Updated</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  ${ Object.values(app.projects).map(p => projectTemplate(p)).join("") }
              </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;
}
