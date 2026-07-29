#!npx ts-node
import fs from 'fs/promises';
import { camelCase, kebabCase, startCase } from 'lodash';
import path from 'path';
import { exec } from 'child_process';

const SRC_DIR = path.resolve(__dirname, '../src');
const PAGES_DIR = path.resolve(SRC_DIR, 'pages');
const IMPLS_DIR = path.resolve(SRC_DIR, 'components/impls');
const PATH_SEP = /[\\\\/]/g;
const IMPORT_PREFIX = '~/';

const shouldOpenInEditor = false;

async function main() {
  if (process.argv.length !== 3) {
    error__('Expected an argument <page-path>');
  }

  const pagePath = process.argv[2];

  if (!pagePath) {
    error__('The supplied <page-path> is not valid');
  }

  const name = pagePath.split(PATH_SEP).pop();

  if (!name) {
    error__('Could not resolve page name');
  }

  const resolvedName = kebabCase(name);
  const componentName = startCase(camelCase(resolvedName)).replace(/\s/g, '');
  const resolvedPagePath = `${pagePath}**`.replace(`${name!}**`, resolvedName);

  // handle page generation
  const pageFilePath = path.resolve(PAGES_DIR, `${resolvedPagePath}/index.tsx`);

  if (await fileExists(pageFilePath)) {
    info__('Seems page already exists');
  } else {
    await writeContentToFile(
      pageFilePath,
      `//
import ${componentName}PageImpl from '${IMPORT_PREFIX}components/impls/${resolvedPagePath}';

function ${componentName}Page() {
  return <${componentName}PageImpl />;
}

export default ${componentName}Page;
`
    );

    info__('Page generated');
  }

  // handle page impl generation
  const implFilePath = path.resolve(IMPLS_DIR, `${resolvedPagePath}/index.tsx`);

  if (await fileExists(implFilePath)) {
    info__('Seems page impl already exists');
  } else {
    const pageTitle = startCase(resolvedName.replace('-', ' '));

    await writeContentToFile(
      implFilePath,
      `//
import React from 'react';
import PageSEO from '${IMPORT_PREFIX}components/shared/page-seo';

function ${componentName}PageImpl() {
  return (
    <React.Fragment>
      <PageSEO title="${pageTitle}" />
    </React.Fragment>
  );
}

export default ${componentName}PageImpl;
`
    );

    info__('Page Impl generated');

    if (shouldOpenInEditor) {
      info__('Opening Page Impl in vscode');

      openInCodeIfPossible(implFilePath);
    }
  }
}

async function fileExists(filePath: string) {
  return fs.open(filePath).then(
    () => true,
    () => false
  );
}

async function writeContentToFile(file_path: string, content: string) {
  await ensureDirExists(file_path);
  await fs.writeFile(file_path, content);
}

async function ensureDirExists(filePath: string) {
  return fs.mkdir(path.dirname(filePath), { recursive: true });
}

function openInCodeIfPossible(filePath: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const command = `code ${filePath}`;

  exec(command, (error: any) => {
    if (error) {
      error__('Seems vscode is not installed');
    } else {
      info__('Opened');
    }

    process.exit(0);
  });
}

function error__(message: string, ...args: any[]) {
  console.error(`[error] ${message}`, ...args);
  process.exit(0);
}

function info__(message: string, ...args: any[]) {
  console.info(`[info] ${message}`, ...args);
}

void main();
