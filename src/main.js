const Object = require('../models');
const { Op } = require('sequelize');
const db = require('../db/db');

async function seed() {

  await db.sync({
    force: true
  });

  const numOfRows = 100;
  const genomeLength = 30;

  for (let i = 0; i < numOfRows; i++) {
    const _genome = randomGenome(genomeLength);
    const _mRNA = getmRNA(_genome);
    const _proteinSequence = getProteinSequence(_mRNA);
    await Object.create({
      genome: _genome,
      mRNA: _mRNA,
      proteinSequence: _proteinSequence
    });
  }

}

function randomGenome(length) {
  let genome = '';
  const chars = ['A', 'T', 'G', 'C'];
  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * 4);
    genome += chars[rand];
  }
  return genome;
}

function getmRNA(dna) {
  let rna = '';
  const code = {
    A: 'U',
    T: 'A',
    G: 'C',
    C: 'G'
  }

  for (let nucleotide of dna) {
    rna += code[nucleotide];
  }

  return rna;
}

function getProteinSequence(rna) {
  const geneticCode = {
    Phe : ['UUU', 'UUC'],
    Leu: ['UUA', 'UUG', 'CUU', 'CUC', 'CUA', 'CUG'],
    Ile: ['AUU', 'AUC', 'AUA'],
    Met: ['AUG'],
    Val: ['GUU', 'GUC', 'GUA', 'GUG'],
    Ser: ['UCU', 'UCC', 'UCA', 'UCG', 'AGU', 'AGC'],
    Pro: ['CCU', 'CCC', 'CCA', 'CCG'],
    Thr: ['ACU', 'ACC', 'ACA', 'ACG'],
    Ala: ['GCU', 'GCC', 'GCA', 'GCG'],
    Tyr: ['UAU', 'UAC'],
    X: ['UAA', 'UAG', 'UGA'],
    His: ['CAU', 'CAC'],
    Gln: ['CAA', 'CAG'],
    Asn: ['AAU', 'AAC'],
    Lys: ['AAA', 'AAG'],
    Asp: ['GAU', 'GAC'],
    Glu: ['GAA', 'GAG'],
    Cys: ['UGU', 'UGC'],
    Trp: ['UGG'],
    Arg: ['CGU', 'CGC', 'CGA', 'CGG', 'AGA', 'AGG'],
    Gly: ['GGU', 'GGC', 'GGA', 'GGG']
  }

  let arr = new Array();
  let start = rna.length;
  let stopped = false;

  for (let i = 0; i < rna.length; i++) {
    if ((i + 3) > rna.length) {
      break;
    }
    const codon = rna.slice(i, i+3);
    if (codon === 'AUG'){
      start = i;
    }
  }

  outer2: for (let i = start; i < rna.length; i+=3) {
    if ((i + 3) > rna.length) {
      break;
    }
    const codon = rna.slice(i, i+3);

    outer: for (let aa in geneticCode) {
      for (let index of geneticCode[aa]) { 
        if (index === codon) {
          if (aa === 'X') {
            stopped = true;
            break outer2;
          }
          arr.push(aa);
          break outer;
        }
      }
    }
  }
  return (arr.length === 0 || !stopped) ? null : arr.join('-');
}

async function main() {

  const tots = await Object.findAll({
    attributes: [['id', 'ID'], ['genome', 'Genome'], ['mRNA', 'mRNA Sequence'], ['proteinSequence', 'Peptide Sequence']]
  });
  console.table(tots.map(row => row.toJSON()));

}

seed();
main();
