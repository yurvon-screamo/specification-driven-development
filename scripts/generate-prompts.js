const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '..', 'docs');
const promtsDir = path.join(__dirname, '..', 'promts');

if (!fs.existsSync(promtsDir)) {
    fs.mkdirSync(promtsDir, { recursive: true });
}

function readFile(filePath) {
    try {
        return fs.readFileSync(filePath, 'utf8');
    } catch (error) {
        console.error(`Error reading file ${filePath}:`, error.message);
        return '';
    }
}

function writeFile(filePath, content) {
    try {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Created file: ${path.relative(process.cwd(), filePath)}`);
    } catch (error) {
        console.error(`Error writing file ${filePath}:`, error.message);
    }
}

function combineFiles(fileNames) {
    let combinedContent = '';
    
    fileNames.forEach(fileName => {
        const filePath = path.join(docsDir, fileName);
        const content = readFile(filePath);
        
        if (content) {
            if (combinedContent) {
                combinedContent += '\n\n---\n\n';
            }
            combinedContent += content;
        }
    });
    
    return combinedContent;
}

function createContextFile(content, title, description) {
    return `# ${title}

${description}

\`\`\`\`\`md
${content}
\`\`\`\`\`
`;
}

function generatePrompts() {
    console.log('Starting generation of files promts/...');
    
    const contexts = {
        'context.md': {
            files: [
                'standards.md',
                'methodology.md', 
                'requirements_phase.md',
                'design_phase.md',
                'tasks_phase.md',
                'steering_documents.md'
            ],
            title: '📋 Context for work with specification',
        },
        'micro_context.md': {
            files: [
                'standards.md',
                'methodology.md',
                'micro_specification.md',
                'steering_documents.md'
            ],
            title: '⚡ Context for work with micro-specification',
        },
        'quick_context.md': {
            files: [
                'standards.md',
                'methodology.md',
                'quick_specification.md',
                'steering_documents.md'
            ],
            title: '🚀 Context for work with quick specification',
        },
        'steering.md': {
            files: [
                'standards.md',
                'methodology.md',
                'requirements_phase.md',
                'design_phase.md',
                'tasks_phase.md',
                'steering_documents.md'
            ],
            title: '🎯 Context for work with steering',
        }
    };
    
    Object.entries(contexts).forEach(([fileName, config]) => {
        console.log(`Generating ${fileName}...`);
        
        const missingFiles = config.files.filter(file => 
            !fs.existsSync(path.join(docsDir, file))
        );
        
        if (missingFiles.length > 0) {
            console.warn(`Missing files: ${missingFiles.join(', ')}`);
        }
        
        const combinedContent = combineFiles(config.files);
        
        if (combinedContent) {
            const contextContent = createContextFile(
                combinedContent,
                config.title,
                config.description
            );
            
            const outputPath = path.join(promtsDir, fileName);
            writeFile(outputPath, contextContent);
        } else {
            console.error(`❌ Failed to generate content for ${fileName}`);
        }
    });
    

    const gitkeepPath = path.join(promtsDir, '.gitkeep');
    if (!fs.existsSync(gitkeepPath)) {
        writeFile(gitkeepPath, '# This file keeps the promts/ directory in the repository\n# The content of the directory is generated automatically');
    }
    
    console.log('✅ Generation completed!');
}

if (require.main === module) {
    generatePrompts();
}

module.exports = { generatePrompts };
