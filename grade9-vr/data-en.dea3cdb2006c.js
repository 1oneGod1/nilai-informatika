// English version; lesson IDs, answer indices and assessment weights match Indonesian.
const CONFIG = {
  "gradebookUrl": "../index.html",
  "bsdUrl": "https://app.bsd.education/",
  "teacher": "Andi Purba",
  "course": "Construct a VR World",
  "courseBrief": {
    "mainGoal": "Design, build, and test a simple virtual diorama with a clear theme, an interaction, and a purpose you can explain to visitors.",
    "overview": "Start with a scene and 3D shapes, then add textures, lighting, imported models, and gaze interaction. Next, design your own diorama, test it with a partner, improve it, and explain your decisions.",
    "outcomes": [
      "Arrange 3D objects and adjust their position, rotation, and size.",
      "Choose textures and lighting that support the theme and keep important objects visible.",
      "Create one simple interaction and test the visitor experience.",
      "Explain your code, credit asset sources, and document revisions."
    ],
    "finalTask": "Create one diorama with a clear theme. Include your plan, sources for any third-party assets, test results, and evidence of revision. Each student explains code and makes a small modification, including when the project is made in a group.",
    "stages": [
      [
        "1–2",
        "Foundations",
        "Scenes, attributes, shapes, coordinates, and object groups."
      ],
      [
        "3–5",
        "Visuals & interaction",
        "Textures, lighting, imported models, and gaze responses."
      ],
      [
        "6–9",
        "Your own creation",
        "Plan, build, test, revise, and demonstrate your diorama."
      ]
    ],
    "wka": {
      "principle": "Use your creative abilities responsibly and with care for others.",
      "reference": "Genesis 1:27; Philippians 2:4",
      "url": "https://www.bible.com/bible/111/GEN.1.27.NIV",
      "practice": "Design an experience that helps visitors, use assets honestly, and listen to feedback.",
      "question": "Who could benefit from your virtual creation?",
      "sources": [
        {
          "reference": "Genesis 1:27",
          "url": "https://www.bible.com/bible/111/GEN.1.27.NIV"
        },
        {
          "reference": "Philippians 2:4",
          "url": "https://www.bible.com/bible/111/PHP.2.4.NIV"
        }
      ]
    }
  }
};
const LESSONS = [
  {
    "id": 1,
    "title": "Hello, virtual world!",
    "subtitle": "Discover VR and build your first scene.",
    "tag": "Foundations",
    "label": "First scene",
    "lab": "position",
    "prompt": "If you could take your classmates somewhere without leaving the classroom, what place would you create?",
    "bsd": [
      "Explore “Code Your Own World with VR”",
      "Set up A-Frame"
    ],
    "scope": "Start with an introduction, load A-Frame, and create a scene with simple objects.",
    "goals": [
      "Explain one purpose of a virtual world.",
      "Identify scenes, elements, and attributes.",
      "Create an object in an A-Frame scene."
    ],
    "concepts": [
      [
        "A scene is a space",
        "<a-scene> contains the 3D world. Objects, lighting, and cameras belong inside it."
      ],
      [
        "Elements create objects",
        "Elements such as <a-box> create shapes. Attributes such as color and position control their appearance."
      ],
      [
        "Load the framework",
        "A-Frame is loaded through a <script> element. In BSD, follow the library address given in the project instructions."
      ]
    ],
    "code": "<a-scene>\n  <a-box position=\"0 1 -3\"\n         color=\"#D8EF9B\"></a-box>\n</a-scene>",
    "challenge": "Add a second object with a different color. Explain which parts of the code set the color and position of each object.",
    "evidence": "A scene with two objects, plus an explanation of the scene and one attribute.",
    "summary": [
      "The scene contains the 3D world.",
      "Elements create objects; attributes control their properties.",
      "Test what appears on screen, rather than only typing code."
    ],
    "reflection": "What object would you like to create next, and which element might you need?",
    "times": [
      [
        "HTML & JavaScript diagnostic",
        15
      ],
      [
        "Explore a VR example",
        10
      ],
      [
        "First scene & modification",
        40
      ],
      [
        "Formative quiz & discussion",
        10
      ],
      [
        "Exit ticket",
        5
      ]
    ],
    "teacher": "Use the diagnostic to plan support, not to assign a final grade. Review questions 1–3 for HTML tags/attributes and 4–5 for JavaScript variables/events; do not rely only on the total score. Ask students to change an attribute and explain the result as a practical check. Provide a starter scene and a JavaScript introduction before gaze interaction if needed.",
    "questions": [
      [
        "A box is written after </a-scene>. Which structural fix is correct?",
        [
          "Move the box inside <script>",
          "Move the box inside <a-scene>",
          "Change its color"
        ],
        1,
        "A-Frame world objects belong inside the scene."
      ],
      [
        "In <a-box position=\"0 1 -3\" color=\"red\">, what sets the color?",
        [
          "color=\"red\"",
          "position=\"0 1 -3\"",
          "Only the element name a-box"
        ],
        0,
        "color controls color; position controls location."
      ],
      [
        "An object disappears after a code change. What is a sensible first step?",
        [
          "Replace the entire project",
          "Change color, position, and library together",
          "Check the latest change, structure, position, and error messages"
        ],
        2,
        "Begin with evidence close to the problem and test one change."
      ]
    ],
    "openingQuestions": [
      [
        "In <a-box color=\"red\"></a-box>, which is the element name?",
        [
          "a-box",
          "color",
          "red"
        ],
        0,
        "a-box is the element name; color is an attribute and red is its value."
      ],
      [
        "How do you place a box inside a scene?",
        [
          "<a-scene></a-scene><a-box></a-box>",
          "<a-scene><a-box></a-box></a-scene>",
          "<a-box><a-scene></a-scene></a-box>"
        ],
        1,
        "The box belongs between the scene’s opening and closing tags."
      ],
      [
        "If only color changes from red to blue, what changes?",
        [
          "The box’s location",
          "The box’s size",
          "The box’s color"
        ],
        2,
        "The attribute being changed controls the corresponding property."
      ],
      [
        "What does let warna = \"red\"; do in JavaScript?",
        [
          "Stores red in the variable warna",
          "Immediately creates a red box",
          "Loads the A-Frame library"
        ],
        0,
        "A variable stores a value; changing an object requires another instruction."
      ],
      [
        "button.addEventListener(\"click\", ubahWarna) means…",
        [
          "ubahWarna runs when the file is saved",
          "ubahWarna is called when button receives a click",
          "button changes color without another function"
        ],
        1,
        "An event listener connects an event to a response function."
      ]
    ],
    "bsdFocus": [
      "Explore “Code Your Own World with VR” and Set up A-Frame: load the library, create a scene, add shapes, and change one attribute.",
      "Students do not need to complete the entire course or every BSD quiz in this lesson."
    ],
    "preparation": "Check BSD account access. Prepare a starter scene and tag/attribute examples. Test the library before class.",
    "minimumTarget": "Two objects are visible; the student identifies the scene, an element, and the color attribute.",
    "support": "If tags/attributes are unfamiliar, provide a starter scene and change one attribute at a time. If variables/events need support, add a 5–10 minute introduction during practice and scaffold lesson 5.",
    "exitQuestion": "Name the element that contains the world, then one attribute you changed and its effect.",
    "exitExpected": "Identify a-scene and connect a correct attribute (such as color/position) to an observed change.",
    "brief": {
      "mainGoal": "Build a simple A-Frame scene and explain the relationship between the scene, objects, and attributes.",
      "material": [
        "VR presents a three-dimensional space that people can explore. In A-Frame, the scene contains the space, elements create objects, and attributes control properties such as color or position.",
        "Today we load the library as instructed in BSD, create a scene, and add two objects. Focus on identifying code and observing the effect of one change."
      ],
      "why": "Your first scene is the foundation you will reuse in the final diorama.",
      "tasks": [
        "Complete the opening diagnostic so your teacher can plan support.",
        "Follow the BSD scene activity and add a second object with a different color.",
        "Change one attribute, test the result, then complete the quiz and exit ticket."
      ],
      "success": [
        "Two objects are visible inside the scene.",
        "You can identify the scene, object elements, and one attribute in your code.",
        "You can explain the visual change caused by the attribute you modified."
      ],
      "wka": {
        "principle": "People are made in God’s image; every user deserves respect.",
        "reference": "Genesis 1:27",
        "url": "https://www.bible.com/bible/111/GEN.1.27.NIV",
        "practice": "Choose a virtual-world idea that benefits and respects its visitors.",
        "question": "What positive experience would you like to give visitors?"
      },
      "teacherScript": "Today we will start a virtual world with two simple objects. We will identify the scene, elements, and attributes, then observe how changing code changes the result. Your task is to add a second object and explain one change. Be ready to show both the code and its result. From the start, consider a positive experience for your visitors."
    }
  },
  {
    "id": 2,
    "title": "Give your shapes a story",
    "subtitle": "Combine shapes. Adjust position and rotation.",
    "tag": "Foundations",
    "label": "Modeling",
    "lab": "position",
    "prompt": "How could you build a table using only boxes and cylinders?",
    "bsd": [
      "A-Frame Modeling"
    ],
    "scope": "Focus on simple shapes, coordinates, rotation, and parent objects. Use the BSD DNA model as an example.",
    "goals": [
      "Combine shapes into one model.",
      "Predict changes along the X, Y, and Z axes.",
      "Use a parent object to group parts."
    ],
    "concepts": [
      [
        "Three directions, one position",
        "position uses the order X Y Z. X moves horizontally, Y changes height, and Z changes depth."
      ],
      [
        "Position differs from rotation",
        "position moves an object. rotation changes its orientation in degrees around X, Y, and Z."
      ],
      [
        "Parts follow their parent",
        "<a-entity> can group objects. Child positions are relative to the parent; transforming the parent affects the group."
      ]
    ],
    "code": "<a-entity position=\"0 1 -3\">\n  <a-box width=\"2\" height=\"0.2\" depth=\"1\"></a-box>\n  <a-cylinder position=\"0 -0.6 0\"\n              radius=\"0.1\" height=\"1\"></a-cylinder>\n</a-entity>",
    "challenge": "Create a tree, chair, or table from several shapes. Move the whole model by changing its parent, then explain what happened.",
    "evidence": "A combined model and a demonstration of one position or rotation change.",
    "summary": [
      "Coordinates use X Y Z order.",
      "Rotation changes orientation; position changes location.",
      "A parent helps manage parts as one group."
    ],
    "reflection": "Why is a parent object useful compared with moving each part separately?",
    "times": [
      [
        "Opening quiz & prediction",
        10
      ],
      [
        "Guided modeling",
        30
      ],
      [
        "Independent model modification",
        25
      ],
      [
        "Formative quiz & exit ticket",
        15
      ]
    ],
    "teacher": "Ask for predictions before changing values. When an object is invisible, check its position and parent–child relationship. A new model provides evidence of transfer beyond the tutorial.",
    "questions": [
      [
        "Y changes from 1 to 2 while X and Z stay the same. What happens?",
        [
          "The object moves one unit higher",
          "The object becomes one unit wider",
          "The object moves one unit further away"
        ],
        0,
        "Y controls height; size is unchanged."
      ],
      [
        "All tree parts are inside one <a-entity>. How can you rotate them together?",
        [
          "Change every leaf’s position",
          "Change the parent’s rotation",
          "Change the scene’s scale"
        ],
        1,
        "Rotating the parent transforms the child group."
      ],
      [
        "A parent is at \"2 0 -3\", and a child at \"1 0 0\", with no other rotation/scale. What is the child’s world position?",
        [
          "1 0 0",
          "2 0 -3",
          "3 0 -3"
        ],
        2,
        "With no other transformations, add the child’s relative position to the parent’s position."
      ]
    ],
    "openingQuestions": [
      [
        "A-Frame objects are placed inside…",
        [
          "<a-assets>",
          "<a-scene>",
          "<script>"
        ],
        1,
        "The scene contains the 3D objects."
      ],
      [
        "Two boxes need different colors. What should you change?",
        [
          "The scene name",
          "Only the file order",
          "Each box’s color value"
        ],
        2,
        "Each object’s color can be set through its color attribute."
      ],
      [
        "A box appears in the wrong place. What should you check first?",
        [
          "Its position",
          "The project title",
          "The creator’s name"
        ],
        0,
        "position determines location."
      ]
    ],
    "bsdFocus": [
      "A-Frame Modeling: use the BSD DNA model to illustrate shapes, coordinates, rotation, and groups.",
      "Choose representative sections and transfer the ideas to a simple tree/chair/table. The entire DNA model does not need to be completed in one session."
    ],
    "preparation": "Prepare a working grouped model and show the parent and children before students modify it.",
    "minimumTarget": "One combined model; the student moves or rotates its parent and predicts the result.",
    "support": "Provide two ready-made shapes. Change X/Y first, then rotation. Extension: add parts without breaking the group.",
    "exitQuestion": "If the parent moves two units along X, how do its children change? State your assumptions.",
    "exitExpected": "The children move with the parent. Without additional rotation/scale, their world X coordinates increase by two.",
    "brief": {
      "mainGoal": "Build one model from several shapes and transform the whole model through its parent.",
      "material": [
        "A table, tree, or chair can be built by combining simple shapes. position uses X, Y, Z order; rotation controls orientation.",
        "Group the parts under a parent object. Child positions are relative to the parent, so the group can move or rotate together."
      ],
      "why": "An original model shows that you can apply ideas beyond a tutorial example.",
      "tasks": [
        "Predict coordinate changes before changing the BSD modeling values.",
        "Build a tree, chair, or table from several shapes under one parent.",
        "Move or rotate the parent, demonstrate the result, then complete the quiz and exit ticket."
      ],
      "success": [
        "Your shapes form a recognizable model.",
        "Changing the parent affects all its parts.",
        "You can explain position versus rotation and the order X, Y, Z."
      ],
      "wka": {
        "principle": "Working wholeheartedly shapes how we use the abilities entrusted to us.",
        "reference": "Colossians 3:23",
        "url": "https://www.bible.com/bible/111/COL.3.23.NIV",
        "practice": "Arrange your model carefully and check it after changing its parent.",
        "question": "Which part needs refinement to make your model understandable?"
      },
      "teacherScript": "Today we will create an object from several shapes. We will use coordinates to position its parts, rotation to change orientation, and one parent to move the parts together. Build a simple model and demonstrate a change to its parent. Be ready to predict and explain the result. Careful construction and testing are part of working wholeheartedly."
    }
  },
  {
    "id": 3,
    "title": "Create the atmosphere",
    "subtitle": "Give your world character with textures and lighting.",
    "tag": "Visuals",
    "label": "Textures & lighting",
    "lab": "light",
    "prompt": "Why can the same room feel warm, calm, or mysterious just by changing its lighting?",
    "bsd": [
      "A-Frame Image Textures",
      "A-Frame Lighting and Fog"
    ],
    "scope": "Select texture and basic lighting activities. Fog and advanced variations are extensions.",
    "goals": [
      "Apply a texture to an object.",
      "Compare the effects of lighting changes.",
      "Explain how visual choices support atmosphere."
    ],
    "concepts": [
      [
        "Textures add surface detail",
        "An image can become a texture through src. Use suitable assets and check that the address loads."
      ],
      [
        "Lighting creates atmosphere",
        "Ambient light provides general illumination. Directional light comes from a particular direction. Their balance affects the appearance of shapes."
      ],
      [
        "Choices need a reason",
        "Choose textures and light intensity to support the theme. Check that details and important objects remain visible."
      ]
    ],
    "code": "<a-sphere color=\"white\" roughness=\"0.25\"\n  wireframe=\"false\"\n  src=\"/resources/projects/materials-and-textures/ball.jpg\">\n</a-sphere>\n<a-light type=\"ambient\" intensity=\"0.5\"></a-light>",
    "challenge": "Create two atmospheres for the same scene. Change textures or lighting, then choose the version that best supports your theme.",
    "evidence": "Two screenshots and a reason for choosing one atmosphere.",
    "summary": [
      "Textures affect surface appearance.",
      "Lighting affects visibility and atmosphere.",
      "Visual choices should support the theme, rather than simply adding effects."
    ],
    "reflection": "Which visual change best helped people understand your scene’s atmosphere?",
    "times": [
      [
        "Opening quiz & comparison",
        8
      ],
      [
        "Texture a starter scene",
        25
      ],
      [
        "Demonstrate & modify basic lighting",
        25
      ],
      [
        "Compare two versions",
        12
      ],
      [
        "Formative quiz & exit ticket",
        10
      ]
    ],
    "teacher": "Prepare texture assets before class. Discuss visibility as well as appearance. Assess students’ reasoning, not the teacher’s color preference.",
    "questions": [
      [
        "The image is set through src, but wireframe=\"true\" remains. How can you show the textured surface?",
        [
          "Disable wireframe and check the image address",
          "Only change the camera position",
          "Only rename the object"
        ],
        0,
        "Wireframe displays the object’s edges; the BSD textured surface uses wireframe false."
      ],
      [
        "The scene has a night theme, but the main target is dark. Which improvement is best?",
        [
          "Increase fog without testing",
          "Adjust the target’s lighting and test visibility",
          "Change to a daytime theme without comparison"
        ],
        1,
        "Keep the design purpose while improving visibility and comparing results."
      ],
      [
        "What evidence supports your lighting choice?",
        [
          "The largest number of lights",
          "All lights use the same intensity",
          "Two compared versions and a reason for choosing one"
        ],
        2,
        "Comparison and reasoning connect visuals to the purpose."
      ]
    ],
    "openingQuestions": [
      [
        "position=\"0 2 -3\" places the object at a height of…",
        [
          "0",
          "-3",
          "2"
        ],
        2,
        "Y is the second coordinate and controls height."
      ],
      [
        "Which attribute changes a light/model’s orientation?",
        [
          "rotation",
          "color",
          "src"
        ],
        0,
        "rotation controls orientation rather than location or color."
      ],
      [
        "Why group parts under one parent?",
        [
          "Every part automatically gets a texture",
          "You can move the whole group together",
          "All parts turn into one image"
        ],
        1,
        "The parent’s transformation affects its children."
      ]
    ],
    "bsdFocus": [
      "A-Frame Image Textures: focus on Apply a texture (step 8) in a prepared scene: image src, color white, and wireframe false.",
      "A-Frame Lighting and Fog: select basic lighting only. Fog, texture repetition, and advanced variations are extensions."
    ],
    "preparation": "Prepare BSD images or accessible class assets and a scene with starter lights. Completing both full projects is not the target for 80 minutes.",
    "minimumTarget": "One textured surface and two lighting versions to compare, with an explanation of the choice.",
    "support": "Provide asset addresses rather than asking students to search for images during class. If progress is slow, demonstrate lighting and have students change one intensity.",
    "exitQuestion": "Your scene has a night theme, but the target is hard to see. What lighting change will you test, and what evidence would show it helps?",
    "exitExpected": "Suggest an adjustment that keeps the theme and check whether users can see/find the target more easily.",
    "brief": {
      "mainGoal": "Use textures and lighting to create an atmosphere that supports the theme and keeps important objects visible.",
      "material": [
        "A texture is an image applied to an object’s surface. Its address must load; the BSD textured-surface activity uses wireframe false.",
        "Lighting affects atmosphere and visibility. Compare two versions using basic lighting; fog and advanced settings are extensions."
      ],
      "why": "Visitors need to understand the atmosphere and find important objects in your world.",
      "tasks": [
        "Apply one texture to the starter scene using a prepared asset.",
        "Adjust lighting to create two atmospheres and save screenshots of both.",
        "Choose the version that supports the theme, explain your reasoning, and complete the quiz and exit ticket."
      ],
      "success": [
        "A textured surface is visible.",
        "Two lighting versions can be compared in screenshots.",
        "You can justify the atmosphere and show that important objects remain visible."
      ],
      "wka": {
        "principle": "Considering other people’s needs guides our decisions, including visual design.",
        "reference": "Philippians 2:4",
        "url": "https://www.bible.com/bible/111/PHP.2.4.NIV",
        "practice": "Check whether a partner can see important objects before choosing the final visuals.",
        "question": "Does your lighting help visitors understand the scene?"
      },
      "teacherScript": "Today we will create atmosphere through textures and lighting. Apply an image to a surface, then compare two lighting versions. Save both and explain which one supports your theme. Important objects should remain visible. As designers, we consider visitors’ needs and check whether our choices help them."
    }
  },
  {
    "id": 4,
    "title": "Bring assets into your world",
    "subtitle": "Import a model, adjust its scale, and credit its source.",
    "tag": "Assets",
    "label": "Third-party models",
    "lab": "scale",
    "prompt": "If your imported model is larger than the whole park, what should you check?",
    "bsd": [
      "Import Third-Party Models into A-Frame"
    ],
    "scope": "Use one sample model prepared by the teacher. Avoid spending the lesson searching for assets.",
    "goals": [
      "Import a third-party model.",
      "Adjust its size and position.",
      "Record its creator, source, and usage permissions."
    ],
    "concepts": [
      [
        "A model is an asset",
        "A 3D model needs an accessible address. Follow the formats and import method used in the BSD activity."
      ],
      [
        "Size differs from position",
        "scale changes size along X Y Z. position sets location. An invisible model has not necessarily failed to load."
      ],
      [
        "Credit the model’s origin",
        "Record its title, creator if available, source link, and usage terms. Using someone else’s model still requires your own design decisions."
      ]
    ],
    "code": "<a-scene renderer=\"colorManagement: true;\">\n  <a-assets>\n    <a-asset-item id=\"room\"\n      src=\"/resources/projects/importing-models/scene.gltf\">\n    </a-asset-item>\n  </a-assets>\n  <a-gltf-model src=\"#room\"></a-gltf-model>\n</a-scene>",
    "challenge": "Import a model, adjust its proportions, and record its source. Explain one problem and the checks you performed.",
    "evidence": "A visible, appropriately sized model, source information, and an explanation of a problem.",
    "summary": [
      "Asset addresses must be accessible.",
      "scale changes size; position changes location.",
      "Credit the source and check permissions for third-party models."
    ],
    "reflection": "How can you tell whether a model failed to load or is simply at an unsuitable position or size?",
    "times": [
      [
        "Opening quiz",
        8
      ],
      [
        "Import & source demonstration",
        10
      ],
      [
        "Guided model import",
        32
      ],
      [
        "Scale, position & testing",
        20
      ],
      [
        "Formative quiz & exit ticket",
        10
      ]
    ],
    "teacher": "Prepare working models with clear permissions. If assets are inaccessible, use a teacher-provided asset. Do not assess students by the complexity of downloaded models.",
    "questions": [
      [
        "A model is too large but correctly positioned. Which attribute should change first?",
        [
          "position",
          "scale",
          "rotation"
        ],
        1,
        "scale changes size; position changes location."
      ],
      [
        "The room asset has been preloaded with id=\"room\". Which BSD element displays it?",
        [
          "<a-gltf-model src=\"#room\"></a-gltf-model>",
          "<a-assets src=\"#room\"></a-assets>",
          "<a-light src=\"#room\"></a-light>"
        ],
        0,
        "a-asset-item preloads the asset; a-gltf-model displays the referenced model."
      ],
      [
        "A free model has no clear usage terms. What should you do?",
        [
          "Assume every free asset can be used freely",
          "List yourself as the creator",
          "Check the source terms or use a teacher asset with clear permissions"
        ],
        2,
        "A price of zero does not establish usage permission."
      ]
    ],
    "openingQuestions": [
      [
        "A texture image needs…",
        [
          "An accessible src address",
          "A long project name",
          "A rotation of zero"
        ],
        0,
        "src points to the image; an incorrect address prevents loading."
      ],
      [
        "After reducing light intensity, what should you test?",
        [
          "Whether the title changed",
          "Whether important objects are still visible",
          "Whether the model has a new name"
        ],
        1,
        "Lighting choices should keep important objects visible."
      ],
      [
        "Which attribute can apply a texture to an object?",
        [
          "rotation",
          "position",
          "src"
        ],
        2,
        "src can refer to the texture image."
      ]
    ],
    "bsdFocus": [
      "Import Third-Party Models into A-Frame: a-assets, a-asset-item, and id (steps 2–4), then a-gltf-model to display room (step 5).",
      "Make one scale/position modification. The plant, spotlight, and full shadow setup are extensions."
    ],
    "preparation": "Test the BSD room model and prepare an alternative with clear permissions. Provide source information; asset searches should happen outside class.",
    "minimumTarget": "A model is visible with appropriate proportions; its source and usage terms are recorded.",
    "support": "If loading fails, use a tested teacher asset. Check src/id first, then position, scale, and camera.",
    "exitQuestion": "The room asset is loaded but invisible. Write the element that displays it and name two further checks.",
    "exitExpected": "Use a-gltf-model src=\"#room\"; explain checks for matching id/address, position, scale, or camera.",
    "brief": {
      "mainGoal": "Display a third-party model, adjust its proportions, and record its source and usage terms.",
      "material": [
        "A model can be preloaded inside a-assets using an a-asset-item with an id. An a-gltf-model element then displays the model by referring to that id.",
        "Loading an asset does not automatically display it. Check the reference, camera, position, and scale. scale changes size; position changes location."
      ],
      "why": "Existing assets help development, but choosing, placing, and crediting them remains your responsibility.",
      "tasks": [
        "Load and display a tested BSD or teacher-provided model.",
        "Adjust scale and position for sensible proportions, then test the view.",
        "Record the title, creator if available, source link, and usage terms; explain a check you performed."
      ],
      "success": [
        "The model is visible with appropriate proportions.",
        "You can distinguish preloading an asset from displaying a model.",
        "You record sources and permissions without claiming someone else’s asset as your own."
      ],
      "wka": {
        "principle": "Truthfulness shapes how we explain the origin of a creation.",
        "reference": "Ephesians 4:25",
        "url": "https://www.bible.com/bible/111/EPH.4.25.NIV",
        "practice": "Credit the creator and source, and explain what you built or adapted yourself.",
        "question": "How does your source record demonstrate honesty?"
      },
      "teacherScript": "Today we will bring an existing model into our scene. We will distinguish loading an asset from displaying it, then adjust size and position. Display one model, make its proportions sensible, and credit its source. Be ready to explain a check you used when it did not work. We will also be honest about which parts came from someone else."
    }
  },
  {
    "id": 5,
    "title": "A world that responds",
    "subtitle": "Build gaze interaction and test it with a partner.",
    "tag": "Interaction",
    "label": "Gaze interaction",
    "lab": "gaze",
    "prompt": "How does a visitor know that an object can be interacted with?",
    "bsd": [
      "A-Frame Gaze Interactions"
    ],
    "scope": "Create one gaze response with a teacher-provided JavaScript component. Basic components/events are core content; full custom-component and animation projects are extensions.",
    "goals": [
      "Explain an interaction’s trigger and response.",
      "Create a simple gaze interaction following BSD.",
      "Test whether a partner understands how to use it."
    ],
    "concepts": [
      [
        "Trigger, then response",
        "An interaction has a triggering event, such as gazing at a target, and a response the user can observe."
      ],
      [
        "Users need cues",
        "The target should be visible. Give instructions and feedback that help users recognize a successful action."
      ],
      [
        "Test without giving the answer",
        "Let a partner try independently first. Observe confusion, then improve the target, instructions, or response."
      ],
      [
        "Cursor and listener work together",
        "The camera contains a fuse cursor. A component on the target registers a click listener; its callback determines the response. Learn this structure with teacher-provided starter code."
      ]
    ],
    "code": "<!-- A simple adaptation, not the complete BSD project. -->\n<!-- Load A-Frame, then register this component before the scene. -->\n<script>\nAFRAME.registerComponent(\"ubah-warna\", {\n  init: function () {\n    const target = this.el;\n    target.addEventListener(\"click\", function () {\n      target.setAttribute(\"color\", \"green\");\n    });\n  }\n});\n</script>\n<a-scene>\n  <a-camera><a-cursor fuse=\"true\" fuse-timeout=\"1500\"></a-cursor></a-camera>\n  <a-box ubah-warna position=\"0 1.6 -3\" color=\"yellow\"></a-box>\n</a-scene>",
    "challenge": "Create an interactive target. Let a partner try without verbal instructions, then improve one part based on the test.",
    "evidence": "A working interaction, one user finding, and one improvement.",
    "summary": [
      "An interaction has a trigger and a response.",
      "Targets and instructions should be understandable.",
      "Testing with another person reveals problems."
    ],
    "reflection": "What did your partner do differently from what you expected during the interaction test?",
    "times": [
      [
        "Opening quiz",
        8
      ],
      [
        "Trigger & response demonstration",
        10
      ],
      [
        "Gaze with starter code",
        32
      ],
      [
        "Partner test & improvement",
        20
      ],
      [
        "Formative quiz & exit ticket",
        10
      ]
    ],
    "teacher": "Ask students to identify the trigger, response, and evidence of success. Independent user testing is more useful than the creator demonstrating every step.",
    "questions": [
      [
        "A fuse cursor points at a button, then the button changes color. Identify the trigger and response.",
        [
          "Color is the trigger; gaze is the response",
          "Sustained gaze is the trigger; color change is the response",
          "The file name is the trigger; the camera is the response"
        ],
        1,
        "An interaction connects a triggering event with an observable change."
      ],
      [
        "What does button.addEventListener(\"click\", startAnim) do?",
        [
          "Connects the button’s click event to startAnim",
          "Changes every object automatically without a function body",
          "Creates a new camera"
        ],
        0,
        "The listener calls the function when the event occurs; its body defines the response."
      ],
      [
        "The button works, but users cannot find it without help. What should you do?",
        [
          "Add decoration before testing",
          "Only explain verbally during demonstrations",
          "Clarify the target/instructions and retest without help"
        ],
        2,
        "Visitors need to discover and use the target themselves."
      ]
    ],
    "openingQuestions": [
      [
        "scale=\"0.5 0.5 0.5\" changes…",
        [
          "The model’s location to the left",
          "The model’s size to half along all axes",
          "The model’s color to dark"
        ],
        1,
        "scale controls size, not location or color."
      ],
      [
        "The asset is in <a-assets>, but invisible. What else is needed?",
        [
          "A page title",
          "Removing all lights",
          "A scene model element that references the asset"
        ],
        2,
        "Preloading an asset does not automatically display it."
      ],
      [
        "Recording asset sources helps you…",
        [
          "Trace the creator and usage terms",
          "Replace the camera function",
          "Set model coordinates"
        ],
        0,
        "Source records support responsible use of assets."
      ]
    ],
    "bsdFocus": [
      "A-Frame Gaze Interactions: camera, fuse cursor, basic custom component, and click event (steps 2–6) bridge the concepts.",
      "Provide a starter component. Students change one color response and test it. The complete press/release animations and color array are extensions."
    ],
    "preparation": "Prepare working camera/cursor/target HTML and component JavaScript. Load A-Frame first, register the component next, then create the scene. Test on student devices.",
    "minimumTarget": "Gaze causes one visible change; the student explains the listener and modifies the response.",
    "support": "Do not require beginners to write all 14 steps from scratch. If events/variables need support, read the code together and have students change and explain the response color.",
    "exitQuestion": "Name the trigger, the function called, the response, and how your partner demonstrated that the interaction works.",
    "exitExpected": "Connect gaze/fuse → click listener → response function → an observable visual change.",
    "brief": {
      "mainGoal": "Create a gaze interaction with a visible response and test it with another user.",
      "material": [
        "An interaction has a trigger and a response. A fuse cursor inside the camera can activate a target after the gaze stays on it for a set duration.",
        "A JavaScript component registers an event listener on the target. The listener connects an event to a response function, such as a color change. Use the teacher’s starter code, understand the flow, and modify the response."
      ],
      "why": "A responsive world gives visitors something to do, so its targets and instructions need to be understandable.",
      "tasks": [
        "Run the teacher-provided camera, cursor, target, and starter component.",
        "Modify a response and explain the trigger, listener, and response function.",
        "Ask a partner to try without verbal help; record one difficulty and make one improvement."
      ],
      "success": [
        "Gazing at the target triggers a visible change.",
        "You can explain trigger → listener → function → response.",
        "A partner can find/use the target; a finding and improvement are documented."
      ],
      "wka": {
        "principle": "Care for others includes considering their experience of our creations.",
        "reference": "Philippians 2:4",
        "url": "https://www.bible.com/bible/111/PHP.2.4.NIV",
        "practice": "Improve targets and instructions using your partner’s testing difficulties.",
        "question": "What could you change to make the interaction easier for someone else?"
      },
      "teacherScript": "Today our scene will begin responding to users. We will learn about gaze triggers, event listeners, and response functions through starter code. Change one response and ask a partner to try without verbal help. Be ready to show the interaction flow and one improvement. Care for others becomes visible in targets and instructions that are easy to use."
    }
  },
  {
    "id": 6,
    "title": "Plan your own diorama",
    "subtitle": "Choose a theme, set a manageable scope, and start building.",
    "tag": "Project",
    "label": "Diorama planning",
    "lab": "plan",
    "prompt": "What one experience do you want to give visitors to your diorama?",
    "bsd": [
      "Final Project: Diorama",
      "Referencing previous projects"
    ],
    "scope": "The class project is adapted for nine lessons. Agree on a theme and minimum features with the teacher.",
    "goals": [
      "Choose a theme and intended experience.",
      "Sketch a layout and select realistic features.",
      "Start an independent scene in Sandbox."
    ],
    "concepts": [
      [
        "Begin with a purpose",
        "Identify the visitors and what they will see or do. Choose objects and features that support that experience."
      ],
      [
        "Build the minimum version",
        "Prioritize a combined model, textures, lighting, and one interaction. Add extras after the minimum version works."
      ],
      [
        "Plans can develop",
        "A sketch need not be perfect. Use it as a guide and record changes and reasons while building."
      ]
    ],
    "code": "Short plan:\nTheme: ____________________\nVisitors will: ____________________\nMy own model: ____________________\nMain interaction: ____________________\nAssets and sources: ____________________",
    "challenge": "Create a sketch and a minimum-feature list. Review the scope with the teacher before building in Sandbox.",
    "evidence": "A sketch, feature list, and starter scene in Sandbox.",
    "summary": [
      "The theme guides feature choices.",
      "A finished small scope is more useful than a large unfinished plan.",
      "Planning and revision provide process evidence."
    ],
    "reflection": "Which feature will you postpone so that the main experience can be completed?",
    "times": [
      [
        "Opening quiz",
        8
      ],
      [
        "Brief & rubric",
        7
      ],
      [
        "Theme, sketch & minimum features",
        20
      ],
      [
        "Teacher planning check",
        10
      ],
      [
        "Start the diorama in Sandbox",
        25
      ],
      [
        "Formative quiz & next target",
        10
      ]
    ],
    "teacher": "Check scope before students build. Share the rubric and examples of process evidence. BSD references are allowed, but students must explain their adaptations.",
    "questions": [
      [
        "Visitors should find a plant and activate an information button. Which features come first?",
        [
          "Sound effects on every object",
          "The plant, a clear target, and an information response",
          "As many downloaded models as possible"
        ],
        1,
        "Priorities follow the chosen visitor experience."
      ],
      [
        "The plan is too large for the time left. What should you do?",
        [
          "Reduce extras and complete the minimum version",
          "Keep adding features and postpone testing",
          "Change the theme every lesson"
        ],
        0,
        "Reduce scope so core features can be completed and tested."
      ],
      [
        "You move the target in the sketch after teacher feedback. What should you record?",
        [
          "Only the original sketch",
          "The final result without notes",
          "The initial sketch, change, and reasoning"
        ],
        2,
        "Evidence shows development and reasons for revision."
      ]
    ],
    "openingQuestions": [
      [
        "In gaze interaction, the trigger is…",
        [
          "The user looking at the target for the set duration",
          "The teacher opening the gradebook",
          "The creator changing the title"
        ],
        0,
        "A fuse cursor can activate a target after a sustained gaze."
      ],
      [
        "Which response helps the user?",
        [
          "More code without a visible change",
          "The target changes appearance after activation",
          "The file name is hidden"
        ],
        1,
        "An observable response shows that an action worked."
      ],
      [
        "With limited time, which feature comes first?",
        [
          "Every sound effect",
          "The most complex downloaded model",
          "A testable core experience"
        ],
        2,
        "Build the minimum version before adding extras."
      ]
    ],
    "bsdFocus": [
      "Use Final Project: Diorama and Referencing previous projects as a basis. Choose a realistic minimum version for the class.",
      "Start in Sandbox, refer to previous projects, and adapt the work to an original theme."
    ],
    "preparation": "Share the brief/rubric early and a source-record example. Decide whether work is individual or grouped; evidence of mastery remains individual.",
    "minimumTarget": "A sketch, visitor purpose, minimum-feature list, and saved starter scene.",
    "support": "Reduce features that do not support the purpose. In group work, record each student’s contribution and understanding.",
    "exitQuestion": "Name one visitor action, a minimum feature that supports it, and an extra feature you will postpone.",
    "exitExpected": "Connect the purpose and minimum features; explain why extras are postponed for time or feasibility.",
    "brief": {
      "mainGoal": "Plan a diorama with a clear theme and realistic minimum features, then start a scene in Sandbox.",
      "material": [
        "A diorama is a small world that communicates a theme or experience. Begin with the visitor: what will they see or do?",
        "A sketch guides objects, layout, and interaction. The minimum version includes your own combined model, a texture, lighting, and one interaction. Add extras once the main experience works."
      ],
      "why": "A focused plan helps you finish within the available class time.",
      "tasks": [
        "Write your theme, intended visitors, and one main experience.",
        "Sketch the layout, list minimum features and asset sources, and review feasibility with the teacher.",
        "Start a Sandbox scene and set your next building target."
      ],
      "success": [
        "Your theme and visitor action are clear.",
        "The sketch and feature list support the purpose and fit the available time.",
        "The starter scene is saved; postponed extras and the next target are identified."
      ],
      "wka": {
        "principle": "Cultivating and caring for creation guides responsible use of resources.",
        "reference": "Genesis 2:15",
        "url": "https://www.bible.com/bible/111/GEN.2.15.NIV",
        "practice": "Choose a theme that values creation and plan responsible use of time and assets.",
        "question": "What would your diorama help visitors understand or care about?"
      },
      "teacherScript": "Today you will plan your own diorama. Choose a theme, identify your visitors and their actions, then select features that support that experience. Sketch your plan, agree on the minimum features with me, and start a Sandbox scene. Aim for a plan you can complete. Care for creation can guide your theme and responsible use of time and assets."
    }
  },
  {
    "id": 7,
    "title": "Build, test, solve",
    "subtitle": "Develop your creation and trace problems one at a time.",
    "tag": "Project",
    "label": "Development",
    "lab": "debug",
    "prompt": "How is testing a hypothesis different from trying random numbers?",
    "bsd": [
      "Sandbox",
      "Previous projects as references"
    ],
    "scope": "Build the minimum features. Use tutorials as references and adapt them to your plan.",
    "goals": [
      "Develop objects, visuals, and the main interaction.",
      "Trace problems by testing one change at a time.",
      "Explain code and record fixes."
    ],
    "concepts": [
      [
        "State the problem",
        "Distinguish the expected result from what happened. Identify the relevant scene or code."
      ],
      [
        "Test one hypothesis",
        "Review the most recent change and try one fix. Changing many things together makes the cause harder to identify."
      ],
      [
        "Keep a process record",
        "Record the problem, action, and result. Before-and-after screenshots can provide revision evidence."
      ]
    ],
    "code": "Debugging log:\nExpected: ____________________\nActual: ____________________\nSuspected cause: ____________________\nOne change tested: ____________________\nResult: ____________________",
    "challenge": "Choose a problem in your diorama. Record a hypothesis, test one change, and explain the result to the teacher.",
    "evidence": "A diorama prototype, one debugging log, and a code explanation.",
    "summary": [
      "Describe the problem specifically.",
      "Test one change so the cause is easier to trace.",
      "Explaining code provides evidence of individual mastery."
    ],
    "reflection": "Which hypothesis changed after you saw the test result?",
    "times": [
      [
        "Opening quiz & target",
        5
      ],
      [
        "Develop the diorama",
        50
      ],
      [
        "Code check & individual demonstration",
        15
      ],
      [
        "Formative quiz & process log",
        10
      ]
    ],
    "teacher": "Begin individual demonstrations for summative assessment. Ask for code reasoning and one small modification. Record individual evidence separately from group assessment.",
    "questions": [
      [
        "An interaction stops after the response code changes. What is a good debugging step?",
        [
          "Change all HTML and JavaScript together",
          "Review the latest response change and test one hypothesis",
          "Hide the button to avoid testing"
        ],
        1,
        "The latest change is a clue to test systematically."
      ],
      [
        "A feature works again after one value is changed. How can you strengthen the conclusion?",
        [
          "Retest and record the connection between the change and result",
          "Assume every other bug is fixed",
          "Delete the hypothesis notes"
        ],
        0,
        "Retesting checks whether the fix is consistent."
      ],
      [
        "Which note is most useful for teacher discussion?",
        [
          "The project is difficult",
          "I changed some numbers",
          "Box invisible; hypothesis: incorrect Z; changed Z to -3; box now visible"
        ],
        2,
        "The note specifies the problem, hypothesis, action, and result."
      ]
    ],
    "openingQuestions": [
      [
        "A visitor goal should…",
        [
          "Include as many effects as possible",
          "Match the file name",
          "State what visitors will see or do"
        ],
        2,
        "A clear purpose guides supporting features."
      ],
      [
        "What evidence should accompany a third-party model?",
        [
          "Source and usage terms",
          "Only its color",
          "Only the object count"
        ],
        0,
        "Record sources and permissions with the creation."
      ],
      [
        "The minimum features do not work yet. What is the building priority?",
        [
          "Adding another feature",
          "Building and testing the minimum features",
          "Changing the theme repeatedly"
        ],
        1,
        "Prioritize the features needed for the core experience."
      ]
    ],
    "bsdFocus": [
      "Diorama in Sandbox: build the approved minimum version rather than starting a new tutorial project.",
      "Refer to relevant BSD sections while debugging and document your own modifications."
    ],
    "preparation": "Prepare a feature checklist and an individual-check schedule. Check sources, code, and results; help trace one problem.",
    "minimumTarget": "A testable prototype, one debugging log, and an explanation of a code section.",
    "support": "Address obstacles to the core experience first. Begin collecting individual demonstration evidence so it does not all fall in lesson 9.",
    "exitQuestion": "Record one problem: expected result, actual result, hypothesis, one change, and test result.",
    "exitExpected": "Describe a specific problem, testable hypothesis, change, and related result.",
    "brief": {
      "mainGoal": "Develop a diorama prototype and address a problem through focused testing.",
      "material": [
        "Debugging begins by comparing what you expected with what happened. Recent changes and error messages help you form a hypothesis.",
        "Test one change, observe its result, and record the process. Individual checks also begin: explain your code and make a small modification."
      ],
      "why": "Testing improves the creation, and process notes help explain your decisions.",
      "tasks": [
        "Build the approved minimum features.",
        "Choose a problem, write a hypothesis, test one change, and record its result.",
        "Show your prototype and a code section to the teacher; make a small modification when asked."
      ],
      "success": [
        "The prototype is saved and its core features can be tested.",
        "A log includes the problem, hypothesis, one change, and result.",
        "You can explain your code and the effect of a modification."
      ],
      "wka": {
        "principle": "Wholehearted work includes perseverance in our responsibilities.",
        "reference": "Colossians 3:23",
        "url": "https://www.bible.com/bible/111/COL.3.23.NIV",
        "practice": "Trace a problem carefully and record the help you use.",
        "question": "What action demonstrates perseverance when your code does not work yet?"
      },
      "teacherScript": "Today we will develop the main features and trace problems. Choose one problem, test one hypothesis, and record what changed. I will also ask some students to explain their code and make a small modification. Aim for a testable prototype and specific notes. Perseverance means examining problems carefully and taking responsibility for the process."
    }
  },
  {
    "id": 8,
    "title": "See through your users’ eyes",
    "subtitle": "Listen to feedback. Revise with a purpose.",
    "tag": "Project",
    "label": "Testing & revision",
    "lab": "test",
    "prompt": "Is a scene successful if its creator can use it but visitors are confused?",
    "bsd": [
      "Diorama in Sandbox"
    ],
    "scope": "Test a partner’s work, fix the main problem, and save the final version.",
    "goals": [
      "Collect specific feedback.",
      "Prioritize functional and visibility problems.",
      "Show a revision and explain its purpose."
    ],
    "concepts": [
      [
        "Give users a clear task",
        "For example: find the target, activate the interaction, and explain the scene’s theme. Observe without immediately directing them."
      ],
      [
        "Make feedback specific",
        "Describe what happened, its impact, and one suggestion. For example: the target is dark and hard to find; try adding light."
      ],
      [
        "Prioritize improvements",
        "Fix a failed or confusing core feature first. Refine visual details if time remains."
      ]
    ],
    "code": "User testing notes:\nUser task: ____________________\nObservation: ____________________\nImpact: ____________________\nChosen revision: ____________________\nResult after retesting: ____________________",
    "challenge": "Ask a partner to test your diorama. Record an important problem, fix it, and repeat the test with that partner.",
    "evidence": "A final version, before-and-after evidence, and a reason for the revision.",
    "summary": [
      "Testing needs a task and observation.",
      "Specific feedback is easier to act on.",
      "Retest revisions to check whether the problem is resolved."
    ],
    "reflection": "Which feedback did you use, and why did you choose it?",
    "times": [
      [
        "Opening quiz",
        5
      ],
      [
        "Partner testing",
        15
      ],
      [
        "Revise function & design",
        35
      ],
      [
        "Individual demonstration",
        15
      ],
      [
        "Formative quiz, exit & save",
        10
      ]
    ],
    "teacher": "Continue individual demonstrations. Assess the response to feedback, not the number of comments received. Ensure work is saved before class ends.",
    "questions": [
      [
        "A partner needs 20 seconds to find a dark target. Which revision addresses it directly?",
        [
          "Improve target visibility and retest the time needed",
          "Rename the file",
          "Add music without changing the target"
        ],
        0,
        "The improvement targets an observed problem."
      ],
      [
        "The button fails and a decoration color looks unsuitable. What comes first?",
        [
          "Decoration color",
          "The button needed for the main experience",
          "Adding a third feature"
        ],
        1,
        "A failed core feature affects the purpose more than a decorative detail."
      ],
      [
        "Which evidence shows that a revision worked?",
        [
          "The creator feels it looks good",
          "There are more lines of code",
          "A partner completes the task after revision, with retest notes"
        ],
        2,
        "Use the same user task to check the revision’s effect."
      ]
    ],
    "openingQuestions": [
      [
        "Why change one thing first when debugging?",
        [
          "To guarantee short code",
          "To trace the effect of the change",
          "To avoid further testing"
        ],
        1,
        "One change helps test a suspected cause."
      ],
      [
        "Which process evidence is useful?",
        [
          "Only the final result",
          "Only the title",
          "The problem, change, and test result"
        ],
        2,
        "Process evidence shows actions and results."
      ],
      [
        "What should you prepare for a partner’s interaction test?",
        [
          "A clear task and observation notes",
          "Verbal directions for every step",
          "A list of every color"
        ],
        0,
        "Clear tasks make the outcome observable."
      ]
    ],
    "bsdFocus": [
      "Diorama in Sandbox: a partner completes user tasks while the creator observes and revises.",
      "Do not add a new tutorial project. Save the final version and before-and-after evidence."
    ],
    "preparation": "Assign test partners and tasks: find the target, activate it, and describe the theme. Provide observation notes and schedule the next individual demonstrations.",
    "minimumTarget": "A final version, one user finding, a revision, and documented retesting.",
    "support": "Focus revision on the main problem. If individual slots are full, collect a short recorded code explanation and verify a modification live.",
    "exitQuestion": "What did the tester find, what did you change, and what happened when the same task was tested again?",
    "exitExpected": "Connect an observed problem, a targeted revision, and the retest outcome.",
    "brief": {
      "mainGoal": "Improve the diorama using user observations and demonstrate the effect through retesting.",
      "material": [
        "Give the tester a clear task, such as finding a target and activating an interaction. Observe their attempt before helping.",
        "Useful feedback identifies what happened, its impact, and a suggestion. Prioritize the core experience, revise it, and retest the same task."
      ],
      "why": "Other users can reveal problems that the creator has overlooked.",
      "tasks": [
        "Ask a partner to complete a user task and record what actually happens.",
        "Choose an important problem, revise it, and save before-and-after evidence.",
        "Retest the same task, save the final version, and continue individual demonstrations."
      ],
      "success": [
        "The notes contain a specific user finding.",
        "The revision addresses the chosen problem.",
        "Retesting shows the effect of the change; the final version and evidence are saved."
      ],
      "wka": {
        "principle": "Listening carefully and responding patiently helps us receive others well.",
        "reference": "James 1:19",
        "url": "https://www.bible.com/bible/111/JAS.1.19.NIV",
        "practice": "Hear feedback fully, ask about the evidence, and choose a helpful revision.",
        "question": "How will you respond to feedback that differs from your opinion?"
      },
      "teacherScript": "Today we will view the diorama through a user’s eyes. Give a partner a clear task, observe difficulties, and choose the most helpful improvement. Save before-and-after evidence and retest. Be ready to explain the revision and show its effect. We will practice listening calmly and responding respectfully to feedback."
    }
  },
  {
    "id": 9,
    "title": "Show what you have created",
    "subtitle": "Demonstrate, explain, and reflect.",
    "tag": "Showcase",
    "label": "Final demonstration",
    "lab": "showcase",
    "prompt": "Which part of your work best shows that you can make decisions independently?",
    "bsd": [
      "Final diorama",
      "Teacher-set concept test on core content"
    ],
    "scope": "Assessment covers taught content only. The website quiz is practice, not an automatically recorded exam.",
    "goals": [
      "Demonstrate a working core feature.",
      "Explain code and design decisions individually.",
      "Reflect on development throughout the course."
    ],
    "concepts": [
      [
        "Show the result and reasoning",
        "Explain the theme, important code, a core feature, and one revision. Keep the demonstration focused on evidence."
      ],
      [
        "Mastery is individual",
        "Even in a group project, each student explains what they understand and makes a small modification."
      ],
      [
        "Use criteria for assessment",
        "Diorama and process: 70%; individual demonstration: 20%; concept test: 10%. Details are on the final-project page."
      ]
    ],
    "code": "Demonstration sequence:\n1. Theme and main experience.\n2. A working feature.\n3. A code section you understand.\n4. One revision and its reason.\n5. A small modification requested by the teacher.",
    "challenge": "Prepare a short demonstration and process evidence. Practice explaining one code section without reading the tutorial.",
    "evidence": "A final diorama, documentation, individual demonstration, and teacher-set concept test.",
    "summary": [
      "A working creation also needs demonstrated understanding.",
      "Extra features do not automatically earn a higher score.",
      "Practice progress supports preparation; the teacher’s rubric determines official grades."
    ],
    "reflection": "What can you now do independently, and what would you like to learn next?",
    "times": [
      [
        "Opening quiz & readiness",
        5
      ],
      [
        "Official teacher-set concept test",
        15
      ],
      [
        "Remaining demonstrations & submission",
        50
      ],
      [
        "Exit ticket & final reflection",
        10
      ]
    ],
    "teacher": "Use demonstration evidence from lessons 7–9. Adjust test length and timing to class size. Website practice is open for discussion; use different questions for the official test.",
    "questions": [
      [
        "A-Frame objects should be placed inside…",
        [
          "<a-scene>",
          "Only <a-assets>",
          "Only <script>"
        ],
        0,
        "The scene contains world elements; assets preload resources and scripts contain programs."
      ],
      [
        "position changes from \"-2 1 -4\" to \"2 1 -4\". What changes?",
        [
          "Height increases",
          "The X position moves to the right",
          "Size increases"
        ],
        1,
        "Only X changes from -2 to 2; Y and Z are unchanged."
      ],
      [
        "A box should rotate without moving. Which attribute changes?",
        [
          "position",
          "scale",
          "rotation"
        ],
        2,
        "rotation changes orientation, not location."
      ],
      [
        "A parent containing child objects moves. What happens?",
        [
          "The children follow the parent’s transformation",
          "The children always stay at their original world positions",
          "The children automatically get bigger"
        ],
        0,
        "A parent transformation affects its children."
      ],
      [
        "A model loads but is too small. What is the direct adjustment?",
        [
          "Only change position",
          "Increase scale and compare proportions",
          "Remove the asset address"
        ],
        1,
        "scale controls size; check its proportions in the scene."
      ],
      [
        "A texture fails to load. What should you check first?",
        [
          "The image src address and accessibility",
          "The creator’s name",
          "The lesson count"
        ],
        0,
        "An incorrect or inaccessible image address prevents texture loading."
      ],
      [
        "In gaze interaction, an event listener connects…",
        [
          "The title to the date",
          "The model to its download source",
          "An event on the target to a response function"
        ],
        2,
        "The listener calls a function when its registered event occurs."
      ],
      [
        "A third-party model has unclear permissions. What should you do?",
        [
          "Check the source or choose an asset with clear terms",
          "Delete the source record",
          "Assume every download is unrestricted"
        ],
        0,
        "Check usage terms before using the asset."
      ],
      [
        "A scene breaks after several changes. How can you trace the cause?",
        [
          "Add features until it looks different",
          "State the problem, review changes, and test one hypothesis",
          "Change all the code without notes"
        ],
        1,
        "Testing one hypothesis connects changes with results."
      ],
      [
        "Which revision record demonstrates learning?",
        [
          "Only the final result",
          "Only the number of comments",
          "User findings, the chosen change, and the retest result"
        ],
        2,
        "Evidence explains the revision’s purpose and effect."
      ]
    ],
    "openingQuestions": [
      [
        "After improving a hard-to-find target, you should…",
        [
          "Retest with a user",
          "Assume it definitely works",
          "Delete earlier evidence"
        ],
        0,
        "Retesting checks whether the problem is resolved."
      ],
      [
        "Which demonstrates individual mastery?",
        [
          "Only opening the final result",
          "Explaining code and making a small modification",
          "Only saying BSD marked it Passed"
        ],
        1,
        "Explanation and modification provide observable evidence of understanding."
      ],
      [
        "The website’s open practice quizzes are for…",
        [
          "Automatically assigning the whole final grade",
          "Replacing all project evidence",
          "Preparation and understanding checks"
        ],
        2,
        "The teacher uses project evidence, demonstration, and a concept test for official grades."
      ]
    ],
    "bsdFocus": [
      "Final diorama and a teacher-selected/written concept test covering only the core content actually taught.",
      "The 10 questions on the Quiz tab are open practice before lesson 9, not the official test in this lesson’s schedule."
    ],
    "preparation": "Prepare a different test from the open practice, remaining demonstration slots, the rubric, and a submission location. Collect individual evidence in lessons 7–8.",
    "minimumTarget": "Work and process evidence are submitted; each student explains/modifies code; the teacher administers a concept test.",
    "support": "Lessons 7–9 have 80 minutes of demonstration slots in total: about 26 students at 3 minutes each. For larger classes, collect explanations in advance and verify a short modification live rather than scheduling all presentations in lesson 9.",
    "exitQuestion": "Choose a design decision and identify the A-Frame concept you used. What evidence shows the decision worked?",
    "exitExpected": "Connect a decision, correct code/concept, and testing or project evidence; do more than say it is finished.",
    "brief": {
      "mainGoal": "Demonstrate mastery through a final diorama, individual explanation and modification, and a teacher-set concept test.",
      "material": [
        "Explain the theme, a working feature, important code, and a revision with its reason. Every student demonstrates individual understanding, including in group projects.",
        "Assessment: diorama and process 70%, individual demonstration 20%, concept test 10%. The website quiz is preparation before this lesson; the teacher uses different questions for the official test."
      ],
      "why": "The result and the process explanation together show your learning throughout the course.",
      "tasks": [
        "Submit the final diorama, plan, source records, test results, and revision evidence.",
        "Demonstrate at your scheduled time, explain a code section, and modify it when asked.",
        "Complete the official concept test and reflect on your abilities and next learning steps."
      ],
      "success": [
        "Core features work and process documentation can be checked.",
        "You can explain code/decisions and modify code individually.",
        "Sources and contributions are explained honestly; the concept test and reflection are complete."
      ],
      "wka": {
        "principle": "Truthfulness shapes how we account for our learning and results.",
        "reference": "Ephesians 4:25",
        "url": "https://www.bible.com/bible/111/EPH.4.25.NIV",
        "practice": "Explain your contribution, the help you used, and your asset sources honestly.",
        "question": "What do you understand independently, and what help should you acknowledge?"
      },
      "teacherScript": "Today you will show the results and understanding from our learning journey. Submit your diorama and process evidence, demonstrate at your scheduled time, and complete my concept test. Be ready to explain code, design reasoning, and a revision, then make a small modification. Acknowledge contributions, sources, and help honestly. Finish by reflecting on your progress."
    }
  }
];
const RUBRIC = [
  {
    "name": "Function & reliability",
    "max": 20,
    "descriptors": [
      "Most core features do not work yet.",
      "Some core features work, but problems disrupt use.",
      "Most core features work; minor issues remain.",
      "All core features work consistently and have been tested."
    ]
  },
  {
    "name": "Application of A-Frame",
    "max": 20,
    "descriptors": [
      "Concept application is limited or has many errors.",
      "Some concepts are applied correctly; structure needs improvement.",
      "Core concepts are applied correctly and the code is reasonably organized.",
      "Concepts are applied correctly, clearly, and appropriately for the project."
    ]
  },
  {
    "name": "Design & user experience",
    "max": 15,
    "descriptors": [
      "The theme, layout, or interaction is difficult to understand.",
      "The theme is emerging; some parts confuse users.",
      "The theme is clear; the layout and interaction are generally understandable.",
      "The theme, layout, visuals, and interaction support a clear experience."
    ]
  },
  {
    "name": "Process & revision",
    "max": 15,
    "descriptors": [
      "Planning, testing, or revision evidence is very limited.",
      "Some process evidence is present; revision reasoning is unclear.",
      "Planning, testing, and an explained revision are present.",
      "Process evidence is complete; revisions are focused and retested."
    ]
  }
];
