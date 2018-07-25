const formAddIdeaNode = document.querySelector('#interactions form');
const textAreaNode = document.querySelector('#interactions form textarea');
const dashboard = document.getElementById('dashboard');
formAddIdeaNode.addEventListener('submit', function addIdeaToDom(e) {
    e.preventDefault();
    const valueTextArea = textAreaNode.value;
    const containerDiv = document.createElement('div');
    containerDiv.classList.add('col-sm-4', 'idea');
    containerDiv.id = `idea-${document.querySelectorAll('.col-sm-4.idea').length + 1}`;

    containerDiv.innerHTML = ` 
        <div class="panel">
            <p>${valueTextArea}</p>
            <hr>
            <p class="text-right">
                <i class="fa fa-thumbs-o-up"></i>
                <i class="fa fa-thumbs-o-down"></i>
            </p>
        </div>`;
    dashboard.appendChild(containerDiv);
    textAreaNode.value = "";
});


/* 
  <div id="idea-4" class="col-sm-4 idea">
    <div class="panel">
        <p>Equi qui quibus voluptas sequi qui quibusdam non ipsa.</p>
        <hr>
        <p class="text-right">
            <i class="fa fa-thumbs-o-up"></i>
            <i class="fa fa-thumbs-o-down"></i>
        </p>
    </div>
</div> 
*/