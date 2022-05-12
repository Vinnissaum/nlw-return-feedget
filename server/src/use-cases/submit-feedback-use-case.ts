import { MailAdapter } from '../adapters/mail-adapter';
import { FeedbacksRepository } from '../repositories/feedbacks-repositories';

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ){}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const {  type, comment, screenshot } = request;

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format');
    }

    if (!type) {
      throw new Error('Type must be specified');
    }
    
    if (!comment) {
      throw new Error('Comment must be specified');;
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    });

    await this.mailAdapter.sendMail({
      subject: 'Novo feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 1rem; color: #1c1c1c;">`,
        `<p> Tipo de Feedback: ${type}</p>`,
        `<p> Comentário: ${comment}</p>`,
        screenshot ? `<img src="${screenshot}"/>` : ``,
        `</div>`,
      ].join('\n')
    })

  }
} 